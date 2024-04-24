import CallToAction from "../components/CallToAction";

export default function Projects() {
  return (
    <div className="min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3 ">
      <h1 className="text-3xl font-semibold">Projects</h1>
      <p className="text-md text-gray-500">Get the scoop on my latest projects! Head over to my GitHub profile to see what I&apos;ve been working on and let&apos;s connect over code!&#129321;</p>
      <CallToAction />
    </div>
  )
}
