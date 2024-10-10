"use client";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import { Hash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { BookOpenCheck } from "lucide-react";
import { Code } from 'lucide-react';
import { interviewData } from "@/data/interviewData";
import {
  Tabs as TAB,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { SearchIcon } from "lucide-react";
import { prepareData } from "@/data/prepareData";
import { Typography } from "@mui/material";
import Header from "@/components/header";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const router = useRouter();
  const [interviewQues, setInterviewQues] = React.useState([]);

  const checkTopic = [
    {
      topic: "Javascript",
      themeBgColor: "#fefbe8",
      textColor: "#745b10",
      topicColor: "#e4bc40",
    },
  ];

  const [value, setValue] = React.useState(0);
  const [interviewSelection, setInterviewSelection] = React.useState("Junior");
  const [level, setLevel] = React.useState("Beginner");
  const [indexSelected, setIndexValue] = React.useState(0);
  const [topicSelected, setTopicSelected] = React.useState("");
  const topic = router.query.slug;
  let selectedTopicData =
    prepareData.filter((item) => item.category === topic)[0]?.type || [];

  React.useEffect(() => {
    const topic = router.query.slug;
    setTopicSelected(topic);
    const topicIndex = checkTopic.findIndex((t) => t.topic === topic);
    setIndexValue(topicIndex);
  }, [router.query.slug]);

  React.useEffect(() => {
    const filteredTopic = interviewData
      .filter((data) => data.topic === topic)
      .filter((item) => item.categories === interviewSelection);
    setInterviewQues(filteredTopic[0]);
  }, [interviewSelection, router.query.slug]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="w-full md:w-7/12 lg:w-6/12 mx-auto">
      <Header topic={topicSelected} indexSelected={indexSelected} />
      <Box sx={{ width: "auto" }}>
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
            sx={{
              marginTop: 2,
              "& .MuiTabs-indicator": {
                backgroundColor: "var(--javascript-bg)",
              },
              "& .MuiTab-root": {
                color: "var(--javascript-text)",
              },
              "& .MuiTab-root.Mui-selected": {
                color: "var(--javascript-topic)",
              },
            }}
          >
            <Tab
              sx={{ fontWeight: 600, textTransform: "none", fontSize: 17 }}
              label="Prepare"
              {...a11yProps(0)}
            />
            <Tab
              sx={{ fontWeight: 600, textTransform: "none", fontSize: 17 }}
              label="Interview Questions"
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div
            className={`relative rounded-lg border-1 ${
              topic === "Javascript" ? "border-Javascript-border" : ""
            } bg-gray-100 dark:bg-gray-800 w-full`}
            style={{ textTransform: "none", outline: "none" }}
          >
            <Input
              type="text"
              placeholder="Search topic"
              style={{ textTransform: "none", outline: "none" }}
              className="rounded-lg  appearance-none text-[15px] w-full pl-10"
            />
            <SearchIcon
              className={`absolute left-2.5 top-2.5 w-5 h-5 ${
                topic === "Javascript" ? "text-Javascript-bg" : "text-gray-400"
              }`}
            />
          </div>
          <TAB defaultValue="Beginner" value={level} className="w-auto mt-8">
            <TabsList className="grid w-full grid-cols-2 bg-white border">
              <TabsTrigger
                value="Beginner"
                onClick={() => setLevel("Beginner")}
                className={`bg-white text-black ${
                  topic === "Javascript"
                    ? "data-[state=active]:bg-Javascript-bg data-[state=active]:text-Javascript-text"
                    : ""
                }`}
              >
                Beginner Topics
              </TabsTrigger>
              <TabsTrigger
                value="Advance"
                onClick={() => setLevel("Advance")}
                className={`bg-white text-Javascript-text ${
                  topic === "Javascript"
                    ? "data-[state=active]:bg-Javascript-bg data-[state=active]:text-Javascript-text"
                    : ""
                }`}
              >
                Advance Topics
              </TabsTrigger>
            </TabsList>
            <TabsContent value="Beginner" className="mt-5">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      className={`px-0 text-center ${
                        topic === "Javascript" ? "text-Javascript-text " : ""
                      }`}
                    >
                      Topic
                    </TableHead>
                    <TableHead
                      className={`text-center ${
                        topic === "Javascript" ? "text-Javascript-text " : ""
                      }`}
                    >
                      Action
                    </TableHead>
                    {/* <TableHead
                      className={`text-center ${
                        topic === "Javascript" ? "text-Javascript-text " : ""
                      }`}
                    >
                      Status
                    </TableHead> */}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedTopicData.length > 0 &&
                    selectedTopicData[0]?.concepts?.map((concept, index) => (
                      <TableRow key={concept.topic}>
                        <TableCell
                          className={`text-left font-medium text-[15px] p-[0px] ${
                            topic === "Javascript"
                              ? "text-Javascript-text "
                              : ""
                          } md:pl-4`}
                        >
                          {index <= 5 ? (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                duration: 0.8,
                                delay: 0.2 * index,
                                ease: [0, 0.71, 0.2, 1.01],
                              }}
                            >
                              {concept.topic}
                            </motion.div>
                          ) : (
                            <div>{concept.topic}</div>
                          )}
                        </TableCell>
                        <TableCell className="text-right md:flex">
                          {index <= 5 ? (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                duration: 0.8,
                                delay: 0.2 * index,
                                ease: [0, 0.71, 0.2, 1.01],
                              }}
                              onClick={() =>
                                router.push(`/learn/${topic}/${concept.topic}`)
                              }
                              className={`flex mb-1 font-medium cursor-pointer border pt-1.5 pb-1.5 pl-2.5 pr-2.5 rounded-md 
                                ${
                                  topic === "Javascript"
                                    ? " text-Javascript-text bg-white hover:bg-Javascript-bg"
                                    : ""
                                } 
                              md:mb-0 md:mr-[3%] md:ml-auto `}
                            >
                              <BookOpenCheck
                                className={`mr-2 w-[19px] ${
                                  topic === "Javascript"
                                    ? " text-Javascript-topic hover:bg-Javascript-bg hover:text-Javascript-text"
                                    : ""
                                } md: w-[15px]`}
                                // size={"19px"}
                              />
                              Learn
                            </motion.div>
                          ) : (
                            <div
                              onClick={() =>
                                router.push(`/learn/${topic}/${concept.topic}`)
                              }
                              className={`flex mb-1 font-medium cursor-pointer border pt-1.5 pb-1.5 pl-2.5 pr-2.5 rounded-md 
                                ${
                                  topic === "Javascript"
                                    ? " text-Javascript-text bg-white hover:bg-Javascript-bg"
                                    : ""
                                } 
                              md:mb-0 md:mr-[3%] md:ml-auto `}
                            >
                              <BookOpenCheck
                                className={`mr-2 w-[19px]  ${
                                  topic === "Javascript"
                                    ? " text-Javascript-topic hover:bg-Javascript-bg hover:text-Javascript-text"
                                    : ""
                                } md: w-[15px]`}
                                // size={"19px"}
                              />
                              Learn
                            </div>
                          )}
                          {index <= 5 ? (
                            <motion.div
                              onClick={() =>
                                router.push(`/test/${topic}/${concept.topic}`)
                              }
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                duration: 0.8,
                                delay: 0.2 * index,
                                ease: [0, 0.71, 0.2, 1.01],
                              }}
                              className={`flex font-medium cursor-pointer bg-white border pt-1.5 pb-1.5 pl-2.5 pr-2.5 rounded-md ${
                                topic === "Javascript"
                                  ? "text-Javascript-text bg-white hover:bg-Javascript-bg"
                                  : ""
                              }`}
                            >
                              <Code
                                // style={{width: 12px}}
                                className={`mr-2 w-[19px] ${
                                  topic === "Javascript"
                                    ? "text-Javascript-topic hover:bg-Javascript-bg hover:text-Javascript-text"
                                    : ""
                                } md: w-[15px]`}
                                // size={"19px"}
                              />
                              Practice
                            </motion.div>
                          ) : (
                            <div
                              onClick={() =>
                                router.push(`/test/${topic}/${concept.topic}`)
                              }
                              className={`flex font-medium cursor-pointer bg-white border pt-1.5 pb-1.5 pl-2.5 pr-2.5 rounded-md ${
                                topic === "Javascript"
                                  ? "text-Javascript-text bg-white hover:bg-Javascript-bg"
                                  : ""
                              }`}
                            >
                              <Code
                                // style={{width: 12px}}
                                className={`mr-2 w-[19px] ${
                                  topic === "Javascript"
                                    ? "text-Javascript-topic hover:bg-Javascript-bg hover:text-Javascript-text"
                                    : ""
                                } md: w-[15px]`}
                                // size={"19px"}
                              />
                              Practice
                            </div>
                          )}
                        </TableCell>
                        {/* <TableCell className="text-left">
                        <Checkbox
                          color={`${
                            topic === "Javascript"
                              ? "text-Javascript-text bg-white"
                              : ""
                          }`}
                          key={concept.topic}
                          className={`${
                            topic === "Javascript"
                              ? "text-Javascript-text bg-white"
                              : ""
                          }`}
                        />
                      </TableCell> */}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="Advance" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      className={`px-0 text-left ${
                        topic === "Javascript" ? "text-Javascript-text " : ""
                      }`}
                    >
                      Topic
                    </TableHead>
                    <TableHead
                      className={`text-center ${
                        topic === "Javascript" ? "text-Javascript-text " : ""
                      }`}
                    >
                      Action
                    </TableHead>
                    {/* <TableHead
                      className={`text-center ${
                        topic === "Javascript" ? "text-Javascript-text " : ""
                      }`}
                    >
                      Status
                    </TableHead> */}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedTopicData[1]?.concepts?.map((concept, index) => (
                    <TableRow key={concept.topic} className="w-full">
                      <TableCell
                        className={`text-left font-medium text-[15px] p-[0px] ${
                          topic === "Javascript" ? "text-Javascript-text " : ""
                        }`}
                      >
                        {index <= 5 ? (
                          <motion.div
                            className="w-full"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.8,
                              delay: 0.2 * index,
                              ease: [0, 0.71, 0.2, 1.01],
                            }}
                          >
                            {concept.topic}
                          </motion.div>
                        ) : (
                          <div className="w-full">{concept.topic}</div>
                        )}
                      </TableCell>
                      <TableCell className="text-right md:flex">
                        {index <= 5 ? (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.8,
                              delay: 0.2 * index,
                              ease: [0, 0.71, 0.2, 1.01],
                            }}
                            onClick={() =>
                              router.push(`/learn/${topic}/${concept.topic}`)
                            }
                            className={`flex mb-1 font-medium cursor-pointer border pt-1.5 pb-1.5 pl-2.5 pr-2.5 rounded-md 
                              ${
                                topic === "Javascript"
                                  ? " text-Javascript-text bg-white hover:bg-Javascript-bg"
                                  : ""
                              } 
                            md:mb-0 md:mr-[3%] md:ml-auto `}
                          >
                            <BookOpenCheck
                              className={`mr-2 w-[19px] ${
                                topic === "Javascript"
                                  ? " text-Javascript-topic hover:bg-Javascript-bg hover:text-Javascript-text"
                                  : ""
                              } md: w-[15px]`}
                              // size={"19px"}
                            />
                            Learn
                          </motion.div>
                        ) : (
                          <div
                            onClick={() =>
                              router.push(`/learn/${topic}/${concept.topic}`)
                            }
                            className={`flex mb-1 font-medium cursor-pointer border pt-1.5 pb-1.5 pl-2.5 pr-2.5 rounded-md 
                              ${
                                topic === "Javascript"
                                  ? " text-Javascript-text bg-white hover:bg-Javascript-bg"
                                  : ""
                              } 
                            md:mb-0 md:mr-[3%] md:ml-auto `}
                          >
                            {" "}
                            <BookOpenCheck
                              className={`mr-2 w-[19px] ${
                                topic === "Javascript"
                                  ? " text-Javascript-topic hover:bg-Javascript-bg hover:text-Javascript-text"
                                  : ""
                              } md: w-[15px]`}
                              // size={"19px"}
                            />
                            Learn
                          </div>
                        )}
                        {index <= 5 ? (
                          <motion.div
                            onClick={() =>
                              router.push(`/test/${topic}/${concept.topic}`)
                            }
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.8,
                              delay: 0.2 * index,
                              ease: [0, 0.71, 0.2, 1.01],
                            }}
                            className={`flex font-medium cursor-pointer bg-white border pt-1.5 pb-1.5 pl-2.5 pr-2.5 rounded-md ${
                              topic === "Javascript"
                                ? "text-Javascript-text bg-white hover:bg-Javascript-bg"
                                : ""
                            }`}
                          >
                            <Code
                              // style={{width: 12px}}
                              className={`mr-2 w-[19px] ${
                                topic === "Javascript"
                                  ? "text-Javascript-topic hover:bg-Javascript-bg hover:text-Javascript-text"
                                  : ""
                              } md: w-[15px]`}
                              // size={"19px"}
                            />
                            Practice
                          </motion.div>
                        ) : (
                          <div
                            onClick={() =>
                              router.push(`/test/${topic}/${concept.topic}`)
                            }
                            className={`flex font-medium cursor-pointer bg-white border pt-1.5 pb-1.5 pl-2.5 pr-2.5 rounded-md ${
                              topic === "Javascript"
                                ? "text-Javascript-text bg-white hover:bg-Javascript-bg"
                                : ""
                            }`}
                          >
                            <Code
                              // style={{width: 12px}}
                              className={`mr-2 w-[19px] ${
                                topic === "Javascript"
                                  ? "text-Javascript-topic hover:bg-Javascript-bg hover:text-Javascript-text"
                                  : ""
                              } md: w-[15px]`}
                              // size={"19px"}
                            />
                            Practice
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </TAB>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <TAB
            defaultValue="Junior"
            value={interviewSelection}
            className="w-auto mt-2"
          >
            <TabsList className="grid w-full grid-cols-3 bg-white border">
              <TabsTrigger
                value="Junior"
                onClick={() => setInterviewSelection("Junior")}
                className={`bg-white text-black  ${
                  topic === "Javascript"
                    ? "data-[state=active]:bg-Javascript-bg data-[state=active]:text-Javascript-text"
                    : ""
                }`}
              >
                Junior
              </TabsTrigger>
              <TabsTrigger
                value="Mid"
                onClick={() => setInterviewSelection("Mid")}
                className={`bg-white text-Javascript-text  ${
                  topic === "Javascript"
                    ? "data-[state=active]:bg-Javascript-bg data-[state=active]:text-Javascript-text"
                    : ""
                }`}
              >
                Mid
              </TabsTrigger>
              <TabsTrigger
                value="Senior"
                onClick={() => setInterviewSelection("Senior")}
                className={`bg-white text-Javascript-text ${
                  topic === "Javascript"
                    ? "data-[state=active]:bg-Javascript-bg data-[state=active]:text-Javascript-text"
                    : ""
                }`}
              >
                Senior
              </TabsTrigger>
            </TabsList>
            <TabsContent value="Junior" className="mt-4">
              <div className="flex flex-col gap-4 items-center justify-center">
                {interviewQues?.questions
                  ? interviewQues?.questions?.map((item, index) => (
                      <motion.div
                        key={index}
                        animate={{ y: -10 }}
                        transition={{
                          type: "spring",
                          stiffness: 130,
                          delay: 0.01 + index * 0.1,
                        }}
                        className={`rounded-xl w-full cursor-pointer grid grid-cols-12 bg-white shadow-md mt-2 p-4 gap-2 items-center hover:shadow-lg
                ${topic === "Javascript" ? " text-Javascript-text" : ""}`}
                        href="#"
                      >
                        <div className="col-span-11 xl:-ml-5">
                          <p
                            className={`font-semibold ${
                              topic === "Javascript"
                                ? " text-Javascript-text"
                                : ""
                            }`}
                          >
                            {" "}
                            {item.question}
                          </p>
                        </div>

                        <div className="md:col-start-2 col-span-11 xl:-ml-5 w-full">
                          {/* Max three Tags for a div. Map this div for more than 3 tags */}
                          <div className="flex mt-2 justify-end w-full">
                            {item?.tags?.slice(0, 3).map((tags, index) => (
                              <span
                                key={index}
                                className={`flex rounded-xl cursor-pointer pl-2.5 pr-2.5 pt-1 pb-1 mr-2 text-xs font-medium ${
                                  topic === "Javascript"
                                    ? " text-Javascript-text bg-Javascript-lightTheme hover:bg-Javascript-bg"
                                    : ""
                                }`}
                              >
                                <Hash size={"14px"} className="mr-0.5 mt-0.5" />
                                {tags.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))
                  : null}
              </div>
            </TabsContent>
            <TabsContent value="Mid" className="mt-4">
              <div className="flex flex-col gap-4 items-center justify-center">
                {interviewQues?.questions
                  ? interviewQues?.questions?.map((item, index) => (
                      <motion.div
                        key={index}
                        animate={{ y: -10 }}
                        transition={{
                          type: "spring",
                          stiffness: 130,
                          delay: 0.01 + index * 0.1,
                        }}
                        className={`rounded-xl w-full cursor-pointer grid grid-cols-12 bg-white shadow-md mt-2 p-4 gap-2 items-center hover:shadow-lg
                ${topic === "Javascript" ? " text-Javascript-text" : ""}`}
                        href="#"
                      >
                        <div className="col-span-11 xl:-ml-5">
                          <p
                            className={`font-semibold ${
                              topic === "Javascript"
                                ? " text-Javascript-text"
                                : ""
                            }`}
                          >
                            {" "}
                            {item.question}
                          </p>
                        </div>

                        <div className="md:col-start-2 col-span-11 xl:-ml-5 w-full">
                          {/* Max three Tags for a div. Map this div for more than 3 tags */}
                          <div className="flex mt-2 justify-end w-full">
                            {item?.tags?.slice(0, 3).map((tags, index) => (
                              <span
                                key={index}
                                className={`flex rounded-xl cursor-pointer pl-2.5 pr-2.5 pt-1 pb-1 mr-2 text-xs font-medium ${
                                  topic === "Javascript"
                                    ? " text-Javascript-text bg-Javascript-lightTheme hover:bg-Javascript-bg"
                                    : ""
                                }`}
                              >
                                <Hash size={"14px"} className="mr-0.5 mt-0.5" />
                                {tags.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))
                  : null}
              </div>
            </TabsContent>
            <TabsContent value="Senior" className="mt-4">
              <div className="flex flex-col gap-4 items-center justify-center">
                {interviewQues?.questions
                  ? interviewQues?.questions?.map((item, index) => (
                      <motion.div
                        key={index}
                        animate={{ y: -10 }}
                        transition={{
                          type: "spring",
                          stiffness: 130,
                          delay: 0.01 + index * 0.1,
                        }}
                        className={`rounded-xl w-full cursor-pointer grid grid-cols-12 bg-white shadow-md mt-2 p-4 gap-2 items-center hover:shadow-lg
                ${topic === "Javascript" ? " text-Javascript-text" : ""}`}
                        href="#"
                      >
                        <div className="col-span-11 xl:-ml-5">
                          <p
                            className={`font-semibold ${
                              topic === "Javascript"
                                ? " text-Javascript-text"
                                : ""
                            }`}
                          >
                            {" "}
                            {item.question}
                          </p>
                        </div>

                        <div className="md:col-start-2 col-span-11 xl:-ml-5 w-full">
                          {/* Max three Tags for a div. Map this div for more than 3 tags */}
                          <div className="flex mt-2 justify-end w-full">
                            {item?.tags?.slice(0, 3).map((tags, index) => (
                              <span
                                key={index}
                                className={`flex rounded-xl cursor-pointer pl-2.5 pr-2.5 pt-1 pb-1 mr-2 text-xs font-medium ${
                                  topic === "Javascript"
                                    ? " text-Javascript-text bg-Javascript-lightTheme hover:bg-Javascript-bg"
                                    : ""
                                }`}
                              >
                                <Hash size={"14px"} className="mr-0.5 mt-0.5" />
                                {tags.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))
                  : null}
              </div>
            </TabsContent>
          </TAB>
        </CustomTabPanel>
      </Box>
    </Box>
  );
}
