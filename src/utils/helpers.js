import format1 from "../assets/format1.jpg";
import format2 from "../assets/format2.jpeg";
import format3 from "../assets/format3.jpeg";

export const adminsId = ["122211013"];

export const formats = [
  { id: "0", formatName: "IITbombay", img: format1 },
  { id: "1", formatName: "format2", img: format2 },
  { id: "2", formatName: "format3", img: format3 },
];

export function formatDate(date) {
  const d = new Date(date);
  const month = d.toLocaleDateString("en-US", { month: "long" });
  const year = d.getFullYear();
  return `${month},${year}`;
}
export function splitSentences(data) {
  return data
    .split(".")
    .map((sentence, index, array) => {
      if (index < array.length - 1) {
        return sentence.trim() + ".";
      } else {
        return sentence.trim();
      }
    })
    .filter((sentence) => sentence.trim() !== "");
}

export const resumeDetails = [
  {
    info:'Basic Details',
    path:'basicdetails'
  },
  {
    info:'Education',
    path:'education'
  },
  {
    info:'Internships',
    path:'internships'
  },
  {
    info:'Experience',
    path:'experience'
  },
  {
    info:'Projects',
    path:'projects'
  },
  {
    info:'Achievments',
    path:'achievements'
  },
  {
    info: 'Skills',
    path:'skills'
  },
]
