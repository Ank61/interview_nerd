"use client";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import { ArrowLeft } from "lucide-react";
import PrepareSection from "@/components/prepareSection";
import { useRouter } from "next/router";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { BookOpenCheck } from "lucide-react";
import { GraduationCap } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Tabs as TAB,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { SearchIcon } from "lucide-react";
import { color } from "framer-motion";

const invoices = [
  {
    invoice: "Hoisting",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "Currying",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "Memoization",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "Debouncing",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "Throttling",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "Parallelism",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "Concurrency",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

const advance = [
  {
    invoice: "Hoisting 2",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "Currying 2",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "Memoization 2",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "Debouncing",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "Throttling",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "Parallelism",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "Concurrency",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

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
  React.useEffect(() => {
    const topic = router.query.slug;
    setTopicSelected(topic);
    const topicIndex = checkTopic.findIndex((t) => t.topic === topic);
    setIndexValue(topicIndex);
  }, [router.query.slug]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ArrowLeft size={28} />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {indexSelected !== -1 && (
            <span
              className={`scroll-m-20 text-[22px] font-semibold tracking-tight ${
                topic === "Javascript" ? "text-Javascript-topic" : ""
              }`}
            >
              {topicSelected}
            </span>
          )}
        </Box>
      </Box>

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
              className="rounded-lg border-Javascript-border appearance-none text-[15px] w-full  pl-10"
            />
            <SearchIcon className="absolute left-2.5 top-2.5 w-5 h-5 text-gray-400 dark:text-gray-600" />
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
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      className={`${
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
                    <TableHead
                      className={`text-center ${
                        topic === "Javascript" ? "text-Javascript-text " : ""
                      }`}
                    >
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                      <TableCell
                        className={`font-medium text-[17px] p-[2px] ${
                          topic === "Javascript" ? "text-Javascript-text " : ""
                        }`}
                      >
                        {invoice.invoice}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          className={`w-5/6 mb-1 ${
                            topic === "Javascript"
                              ? " text-Javascript-text bg-white "
                              : ""
                          } border-2 `}
                        >
                          <GraduationCap className="mr-2" />
                          Learn
                        </Button>
                        <Button
                          className={`w-5/6 bg-white text-black border-2 ${
                            topic === "Javascript"
                              ? " text-Javascript-text bg-white "
                              : ""
                          }`}
                        >
                          <BookOpenCheck className="mr-2" />
                          Practice
                        </Button>
                      </TableCell>
                      <TableCell className="text-left">
                        <Checkbox
                          color={`${
                            topic === "Javascript"
                              ? "text-Javascript-text bg-white"
                              : ""
                          }`}
                          key={invoice.id}
                          className={`${
                            topic === "Javascript"
                              ? "text-Javascript-text bg-white"
                              : ""
                          }`}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="Advance" className="mt-4">
              <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Topic</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {advance.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                      <TableCell
                        className={`font-medium text-[16px] p-[2px] ${
                          topic === "Javascript" ? "text-Javascript-text " : ""
                        }`}
                      >
                        {invoice.invoice}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button className="w-5/6 mb-1 bg-white text-black border-2">
                          <GraduationCap className="mr-2" />
                          Learn
                        </Button>
                        <Button className="w-5/6 bg-white text-black border-2">
                          <BookOpenCheck className="mr-2" />
                          Practice
                        </Button>
                      </TableCell>
                      <TableCell
                        className={`text-left ${
                          topic === "Javascript"
                            ? " text-Javascript-text bg-white "
                            : ""
                        }`}
                      >
                        <Checkbox
                          key={invoice.id}
                          className={`${
                            topic === "Javascript"
                              ? " text-Javascript-text bg-Javascript-text "
                              : ""
                          }`}
                        />
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
                <motion.div
                  animate={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 130 }}
                  className={`rounded-xl w-full grid grid-cols-12 bg-white shadow-md mt-2 p-4 gap-2 items-center hover:shadow-lg
                ${topic === "Javascript" ? " text-Javascript-text" : ""}`}
                  href="#"
                >
                  <div className="col-span-11 xl:-ml-5">
                    <p
                      className={`font-semibold ${
                        topic === "Javascript" ? " text-Javascript-text" : ""
                      }`}
                    >
                      {" "}
                      Deploy a Django App Using Gunicorn to App Platform{" "}
                    </p>
                  </div>

                  <div className="md:col-start-2 col-span-11 xl:-ml-5">
                    <p className="text-sm text-gray-800 font-light">
                      {" "}
                      Build a Python app using Django and then deploy the app to
                      App Platform using a Gunicorn HTTP server.{" "}
                    </p>
                  </div>
                </motion.div>

                <div
                  className={`rounded-xl w-full grid grid-cols-12 bg-white shadow-lg p-3 gap-2 items-center hover:shadow-lg
                ${topic === "Javascript" ? " text-Javascript-text" : ""}`}
                  href="#"
                >
                  <div className="col-span-11 xl:-ml-5">
                    <p
                      className={`font-semibold ${
                        topic === "Javascript" ? " text-Javascript-text" : ""
                      }`}
                    >
                      {" "}
                      Deploy a Django App Using Gunicorn to App Platform{" "}
                    </p>
                  </div>

                  <div className="md:col-start-2 col-span-11 xl:-ml-5">
                    <p className="text-sm text-gray-800 font-light">
                      {" "}
                      Build a Python app using Django and then deploy the app to
                      App Platform using a Gunicorn HTTP server.{" "}
                    </p>
                  </div>
                </div>

                <div
                  className={`rounded-xl w-full grid grid-cols-12 bg-white shadow-lg p-3 gap-2 items-center hover:shadow-lg
                ${topic === "Javascript" ? " text-Javascript-text" : ""}`}
                  href="#"
                >
                  <div className="col-span-11 xl:-ml-5">
                    <p
                      className={`font-semibold ${
                        topic === "Javascript" ? " text-Javascript-text" : ""
                      }`}
                    >
                      {" "}
                      Deploy a Django App Using Gunicorn to App Platform{" "}
                    </p>
                  </div>

                  <div className="md:col-start-2 col-span-11 xl:-ml-5">
                    <p className="text-sm text-gray-800 font-light">
                      {" "}
                      Build a Python app using Django and then deploy the app to
                      App Platform using a Gunicorn HTTP server.{" "}
                    </p>
                  </div>
                </div>

                <div
                  className={`rounded-xl w-full grid grid-cols-12 bg-white shadow-lg p-3 gap-2 items-center hover:shadow-lg
                ${topic === "Javascript" ? " text-Javascript-text" : ""}`}
                  href="#"
                >
                  <div className="col-span-11 xl:-ml-5">
                    <p
                      className={`font-semibold ${
                        topic === "Javascript" ? " text-Javascript-text" : ""
                      }`}
                    >
                      {" "}
                      Deploy a Django App Using Gunicorn to App Platform{" "}
                    </p>
                  </div>

                  <div className="md:col-start-2 col-span-11 xl:-ml-5">
                    <p className="text-sm text-gray-800 font-light">
                      {" "}
                      Build a Python app using Django and then deploy the app to
                      App Platform using a Gunicorn HTTP server.{" "}
                    </p>
                  </div>
                </div>

                <div
                  className={`rounded-xl w-full grid grid-cols-12 bg-white shadow-lg p-3 gap-2 items-center hover:shadow-lg
                ${topic === "Javascript" ? " text-Javascript-text" : ""}`}
                  href="#"
                >
                  <div className="col-span-11 xl:-ml-5">
                    <p
                      className={`font-semibold ${
                        topic === "Javascript" ? " text-Javascript-text" : ""
                      }`}
                    >
                      {" "}
                      Deploy a Django App Using Gunicorn to App Platform{" "}
                    </p>
                  </div>

                  <div className="md:col-start-2 col-span-11 xl:-ml-5">
                    <p className="text-sm text-gray-800 font-light">
                      {" "}
                      Build a Python app using Django and then deploy the app to
                      App Platform using a Gunicorn HTTP server.{" "}
                    </p>
                  </div>
                </div>

                <div
                  className={`rounded-xl w-full grid grid-cols-12 bg-white shadow-lg p-3 gap-2 items-center hover:shadow-lg
                ${topic === "Javascript" ? " text-Javascript-text" : ""}`}
                  href="#"
                >
                  <div className="col-span-11 xl:-ml-5">
                    <p
                      className={`font-semibold ${
                        topic === "Javascript" ? " text-Javascript-text" : ""
                      }`}
                    >
                      {" "}
                      Deploy a Django App Using Gunicorn to App Platform{" "}
                    </p>
                  </div>

                  <div className="md:col-start-2 col-span-11 xl:-ml-5">
                    <p className="text-sm text-gray-800 font-light">
                      {" "}
                      Build a Python app using Django and then deploy the app to
                      App Platform using a Gunicorn HTTP server.{" "}
                    </p>
                  </div>
                </div>

                <div
                  className={`rounded-xl w-full grid grid-cols-12 bg-white shadow-lg p-3 gap-2 items-center hover:shadow-lg
                ${topic === "Javascript" ? " text-Javascript-text" : ""}`}
                  href="#"
                >
                  <div className="col-span-11 xl:-ml-5">
                    <p
                      className={`font-semibold ${
                        topic === "Javascript" ? " text-Javascript-text" : ""
                      }`}
                    >
                      {" "}
                      Deploy a Django App Using Gunicorn to App Platform{" "}
                    </p>
                  </div>

                  <div className="md:col-start-2 col-span-11 xl:-ml-5">
                    <p className="text-sm text-gray-800 font-light">
                      {" "}
                      Build a Python app using Django and then deploy the app to
                      App Platform using a Gunicorn HTTP server.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="Mid" className="mt-4">
              <div className="flex flex-col gap-4 items-center justify-center">
                <motion.div
                  animate={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 130 }}
                  className={`rounded-xl w-full grid grid-cols-12 bg-white shadow-md mt-2 p-4 gap-2 items-center hover:shadow-lg
                ${topic === "Javascript" ? " text-Javascript-text" : ""}`}
                  href="#"
                >
                  <div className="col-span-11 xl:-ml-5">
                    <p
                      className={`font-semibold ${
                        topic === "Javascript" ? " text-Javascript-text" : ""
                      }`}
                    >
                      {" "}
                      Deploy a Django App Using Gunicorn to App Platform{" "}
                    </p>
                  </div>

                  <div className="md:col-start-2 col-span-11 xl:-ml-5">
                    <p className="text-sm text-gray-800 font-light">
                      {" "}
                      Build a Python app using Django and then deploy the app to
                      App Platform using a Gunicorn HTTP server.{" "}
                    </p>
                  </div>
                </motion.div>

                <div
                  className={`rounded-xl w-full grid grid-cols-12 bg-white shadow-lg p-3 gap-2 items-center hover:shadow-lg
                ${topic === "Javascript" ? " text-Javascript-text" : ""}`}
                  href="#"
                >
                  <div className="col-span-11 xl:-ml-5">
                    <p
                      className={`font-semibold ${
                        topic === "Javascript" ? " text-Javascript-text" : ""
                      }`}
                    >
                      {" "}
                      Deploy a Django App Using Gunicorn to App Platform{" "}
                    </p>
                  </div>

                  <div className="md:col-start-2 col-span-11 xl:-ml-5">
                    <p className="text-sm text-gray-800 font-light">
                      {" "}
                      Build a Python app using Django and then deploy the app to
                      App Platform using a Gunicorn HTTP server.{" "}
                    </p>
                  </div>
                </div>

                <div
                  className={`rounded-xl w-full grid grid-cols-12 bg-white shadow-lg p-3 gap-2 items-center hover:shadow-lg
                ${topic === "Javascript" ? " text-Javascript-text" : ""}`}
                  href="#"
                >
                  <div className="col-span-11 xl:-ml-5">
                    <p
                      className={`font-semibold ${
                        topic === "Javascript" ? " text-Javascript-text" : ""
                      }`}
                    >
                      {" "}
                      Deploy a Django App Using Gunicorn to App Platform{" "}
                    </p>
                  </div>

                  <div className="md:col-start-2 col-span-11 xl:-ml-5">
                    <p className="text-sm text-gray-800 font-light">
                      {" "}
                      Build a Python app using Django and then deploy the app to
                      App Platform using a Gunicorn HTTP server.{" "}
                    </p>
                  </div>
                </div>

                <div
                  className={`rounded-xl w-full grid grid-cols-12 bg-white shadow-lg p-3 gap-2 items-center hover:shadow-lg
                ${topic === "Javascript" ? " text-Javascript-text" : ""}`}
                  href="#"
                >
                  <div className="col-span-11 xl:-ml-5">
                    <p
                      className={`font-semibold ${
                        topic === "Javascript" ? " text-Javascript-text" : ""
                      }`}
                    >
                      {" "}
                      Deploy a Django App Using Gunicorn to App Platform{" "}
                    </p>
                  </div>

                  <div className="md:col-start-2 col-span-11 xl:-ml-5">
                    <p className="text-sm text-gray-800 font-light">
                      {" "}
                      Build a Python app using Django and then deploy the app to
                      App Platform using a Gunicorn HTTP server.{" "}
                    </p>
                  </div>
                </div>

                <div
                  className={`rounded-xl w-full grid grid-cols-12 bg-white shadow-lg p-3 gap-2 items-center hover:shadow-lg
                ${topic === "Javascript" ? " text-Javascript-text" : ""}`}
                  href="#"
                >
                  <div className="col-span-11 xl:-ml-5">
                    <p
                      className={`font-semibold ${
                        topic === "Javascript" ? " text-Javascript-text" : ""
                      }`}
                    >
                      {" "}
                      Deploy a Django App Using Gunicorn to App Platform{" "}
                    </p>
                  </div>

                  <div className="md:col-start-2 col-span-11 xl:-ml-5">
                    <p className="text-sm text-gray-800 font-light">
                      {" "}
                      Build a Python app using Django and then deploy the app to
                      App Platform using a Gunicorn HTTP server.{" "}
                    </p>
                  </div>
                </div>

                <div
                  className={`rounded-xl w-full grid grid-cols-12 bg-white shadow-lg p-3 gap-2 items-center hover:shadow-lg
                ${topic === "Javascript" ? " text-Javascript-text" : ""}`}
                  href="#"
                >
                  <div className="col-span-11 xl:-ml-5">
                    <p
                      className={`font-semibold ${
                        topic === "Javascript" ? " text-Javascript-text" : ""
                      }`}
                    >
                      {" "}
                      Deploy a Django App Using Gunicorn to App Platform{" "}
                    </p>
                  </div>

                  <div className="md:col-start-2 col-span-11 xl:-ml-5">
                    <p className="text-sm text-gray-800 font-light">
                      {" "}
                      Build a Python app using Django and then deploy the app to
                      App Platform using a Gunicorn HTTP server.{" "}
                    </p>
                  </div>
                </div>

                <div
                  className={`rounded-xl w-full grid grid-cols-12 bg-white shadow-lg p-3 gap-2 items-center hover:shadow-lg
                ${topic === "Javascript" ? " text-Javascript-text" : ""}`}
                  href="#"
                >
                  <div className="col-span-11 xl:-ml-5">
                    <p
                      className={`font-semibold ${
                        topic === "Javascript" ? " text-Javascript-text" : ""
                      }`}
                    >
                      {" "}
                      Deploy a Django App Using Gunicorn to App Platform{" "}
                    </p>
                  </div>

                  <div className="md:col-start-2 col-span-11 xl:-ml-5">
                    <p className="text-sm text-gray-800 font-light">
                      {" "}
                      Build a Python app using Django and then deploy the app to
                      App Platform using a Gunicorn HTTP server.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="Senior" className="mt-4">
              <div className="flex flex-col gap-4 items-center justify-center">
                <motion.div
                  animate={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 130 }}
                  className={`rounded-xl w-full grid grid-cols-12 bg-white shadow-md mt-2 p-4 gap-2 items-center hover:shadow-lg
                ${topic === "Javascript" ? " text-Javascript-text" : ""}`}
                  href="#"
                >
                  <div className="col-span-11 xl:-ml-5">
                    <p
                      className={`font-semibold ${
                        topic === "Javascript" ? " text-Javascript-text" : ""
                      }`}
                    >
                      {" "}
                      Deploy a Django App Using Gunicorn to App Platform{" "}
                    </p>
                  </div>

                  <div className="md:col-start-2 col-span-11 xl:-ml-5">
                    <p className="text-sm text-gray-800 font-light">
                      {" "}
                      Build a Python app using Django and then deploy the app to
                      App Platform using a Gunicorn HTTP server.{" "}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 130 }}
                  className={`rounded-xl w-full grid grid-cols-12 bg-white shadow-md mt-2 p-4 gap-2 items-center hover:shadow-lg
                ${topic === "Javascript" ? " text-Javascript-text" : ""}`}
                  href="#"
                >
                  <div className="col-span-11 xl:-ml-5">
                    <p
                      className={`font-semibold ${
                        topic === "Javascript" ? " text-Javascript-text" : ""
                      }`}
                    >
                      {" "}
                      Deploy a Django App Using Gunicorn to App Platform{" "}
                    </p>
                  </div>

                  <div className="md:col-start-2 col-span-11 xl:-ml-5">
                    <p className="text-sm text-gray-800 font-light">
                      {" "}
                      Build a Python app using Django and then deploy the app to
                      App Platform using a Gunicorn HTTP server.{" "}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 130 }}
                  className={`rounded-xl w-full grid grid-cols-12 bg-white shadow-md mt-2 p-4 gap-2 items-center hover:shadow-lg
                ${topic === "Javascript" ? " text-Javascript-text" : ""}`}
                  href="#"
                >
                  <div className="col-span-11 xl:-ml-5">
                    <p
                      className={`font-semibold ${
                        topic === "Javascript" ? " text-Javascript-text" : ""
                      }`}
                    >
                      {" "}
                      Deploy a Django App Using Gunicorn to App Platform{" "}
                    </p>
                  </div>

                  <div className="md:col-start-2 col-span-11 xl:-ml-5">
                    <p className="text-sm text-gray-800 font-light">
                      {" "}
                      Build a Python app using Django and then deploy the app to
                      App Platform using a Gunicorn HTTP server.{" "}
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  animate={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 130 }}
                  className={`rounded-xl w-full grid grid-cols-12 bg-white shadow-md mt-2 p-4 gap-2 items-center hover:shadow-lg
                ${topic === "Javascript" ? " text-Javascript-text" : ""}`}
                  href="#"
                >
                  <div className="col-span-11 xl:-ml-5">
                    <p
                      className={`font-semibold ${
                        topic === "Javascript" ? " text-Javascript-text" : ""
                      }`}
                    >
                      {" "}
                      Deploy a Django App Using Gunicorn to App Platform{" "}
                    </p>
                  </div>

                  <div className="md:col-start-2 col-span-11 xl:-ml-5">
                    <p className="text-sm text-gray-800 font-light">
                      {" "}
                      Build a Python app using Django and then deploy the app to
                      App Platform using a Gunicorn HTTP server.{" "}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 130 }}
                  className={`rounded-xl w-full grid grid-cols-12 bg-white shadow-md mt-2 p-4 gap-2 items-center hover:shadow-lg
                ${topic === "Javascript" ? " text-Javascript-text" : ""}`}
                  href="#"
                >
                  <div className="col-span-11 xl:-ml-5">
                    <p
                      className={`font-semibold ${
                        topic === "Javascript" ? " text-Javascript-text" : ""
                      }`}
                    >
                      {" "}
                      Deploy a Django App Using Gunicorn to App Platform{" "}
                    </p>
                  </div>

                  <div className="md:col-start-2 col-span-11 xl:-ml-5">
                    <p className="text-sm text-gray-800 font-light">
                      {" "}
                      Build a Python app using Django and then deploy the app to
                      App Platform using a Gunicorn HTTP server.{" "}
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  animate={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 130 }}
                  className={`rounded-xl w-full grid grid-cols-12 bg-white shadow-md mt-2 p-4 gap-2 items-center hover:shadow-lg
                ${topic === "Javascript" ? " text-Javascript-text" : ""}`}
                  href="#"
                >
                  <div className="col-span-11 xl:-ml-5">
                    <p
                      className={`font-semibold ${
                        topic === "Javascript" ? " text-Javascript-text" : ""
                      }`}
                    >
                      {" "}
                      Deploy a Django App Using Gunicorn to App Platform{" "}
                    </p>
                  </div>

                  <div className="md:col-start-2 col-span-11 xl:-ml-5">
                    <p className="text-sm text-gray-800 font-light">
                      {" "}
                      Build a Python app using Django and then deploy the app to
                      App Platform using a Gunicorn HTTP server.{" "}
                    </p>
                  </div>
                </motion.div> <motion.div
                  animate={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 130 }}
                  className={`rounded-xl w-full grid grid-cols-12 bg-white shadow-md mt-2 p-4 gap-2 items-center hover:shadow-lg
                ${topic === "Javascript" ? " text-Javascript-text" : ""}`}
                  href="#"
                >
                  <div className="col-span-11 xl:-ml-5">
                    <p
                      className={`font-semibold ${
                        topic === "Javascript" ? " text-Javascript-text" : ""
                      }`}
                    >
                      {" "}
                      Deploy a Django App Using Gunicorn to App Platform{" "}
                    </p>
                  </div>

                  <div className="md:col-start-2 col-span-11 xl:-ml-5">
                    <p className="text-sm text-gray-800 font-light">
                      {" "}
                      Build a Python app using Django and then deploy the app to
                      App Platform using a Gunicorn HTTP server.{" "}
                    </p>
                  </div>
                </motion.div>
                
              </div>
            </TabsContent>
          </TAB>
        </CustomTabPanel>
      </Box>
    </Box>
  );
}
