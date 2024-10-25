"use client"

import {Projects} from "@/constants";
import ProjectCard from "@/components/ProjectCard";

const Page = () => {
    return (
        <div style={{backgroundImage: "url(/Mountains.jpg)"}} className={"w-screen h-screen flex items-center justify-center bg-center bg-cover"}>
            <div className={"grid grid-cols-2 gap-5 max-w-[90%] max-h-[90%] md:grid md:grid-cols-1/"}>
                {Projects.map((project, index) => (
                    <ProjectCard key={index} image={project.src} title={project.title} text={project.text} />
                ))}
            </div>
        </div>
    )
}

export default Page