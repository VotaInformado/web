import { format } from "highcharts";
import { dbGet } from "./DBFetchers";
import { toast } from "react-toastify";
import mapAttrs from "utils/mapAttrs";
import { map } from "lodash";

const formatDate = (rawDate) => {
  if (!rawDate) return "No hay fecha";
  const dateWithoutTime = rawDate.split(" ")[0]; // Extract the date part
  const [year, month, day] = dateWithoutTime.split("-"); // Split the date into year, month, and day
  const formattedDate = `${day}/${month}/${year}`; //
  return formattedDate;
};

export const newsMapping = {
  description: (news) => {
    return news.description;
  },
  title: (news) => {
    return news.title;
  },
  link: (news) => {
    return news.link;
  },
  pubDate: (news) => {
    return formatDate(news.pubDate);
  },
  image_url: (news) => {
    return news.image_url;
  },
};

export async function getNews() {
  const news = await dbGet("news/get-latest-news").catch((err) => {
    console.log(err);
    toast.error("Error al obtener las noticias");
    return null;
  });
  const mappedNewsList = news?.map((news) => mapAttrs(news, newsMapping));
  return mappedNewsList || [];
}
