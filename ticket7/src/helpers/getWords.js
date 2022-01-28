import sleep from "./sleep";

export default async (text) => {
  const words = [
    {
      old: "могозин",
      new: "магазин"
    },
    {
      old: "исдалека",
      new: "издалека"
    },
    {
      old: "площать",
      new: "площадь"
    }
  ];

  sleep(2000);

  return words.filter((word) => text.includes(word.old));
};
