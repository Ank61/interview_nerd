import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import react from "../images/react.png";
import next from "../images/next.png";
import node from "../images/node_logo.png";
import js from "../images/js_logo.png";

export default function Home() {
  return (
    <div>
      <div class="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-4 justify-items-center content-center  mx-auto">
        <div>
          <Card className="w-[350px]">
            <CardHeader>
              <Image src={js} width={40} height={40} alt="js_logo"></Image>
              <CardTitle>ES6 Javascript</CardTitle>
              {/* <CardDescription>
                Deploy your new project in one-click.
              </CardDescription> */}
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </div>
        <div>
          <Card className="w-[350px]">
            <CardHeader>
              <Image src={next} width={50} height={50} alt="js_logo"></Image>
              <CardTitle>Next.js</CardTitle>
              {/* <CardDescription>
                Deploy your new project in one-click.
              </CardDescription> */}
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </div>
        <div>
          <Card className="w-[350px]">
            <CardHeader>
              <Image src={react} width={40} height={40} alt="js_logo"></Image>
              <CardTitle>React.js</CardTitle>
              {/* <CardDescription>
                Deploy your new project in one-click.
              </CardDescription> */}
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </div>
        <div>
          <Card className="w-[350px]">
            <CardHeader>
              <Image src={node} width={50} height={50} alt="js_logo"></Image>
              <CardTitle>Node.js</CardTitle>
              {/* <CardDescription>
                Deploy your new project in one-click.
              </CardDescription> */}
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
