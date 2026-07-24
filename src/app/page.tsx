import { Hero } from "@/components/hero";
import { MetricStrip } from "@/components/metric-strip";
import { Manifesto } from "@/components/manifesto";
import { Capabilities } from "@/components/capabilities";
import { Partners } from "@/components/partners";
import { Work } from "@/components/work";
import { Region } from "@/components/region";
import { Insights } from "@/components/insights";
import { Footer } from "@/components/footer";

export default function Page(){
  return <main>
    <Hero/>
    <MetricStrip/>
    <Manifesto/>
    <Capabilities/>
    <Partners/>
    <Work/>
    <Region/>
    <Insights/>
    <Footer/>
  </main>
}
