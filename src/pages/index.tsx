import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function Home() {
  const [seconds, setSeconds] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  const [gpmCustom, setGPMCustom] = useState(1.5);

  const [gpmInput, setGPMInput] = useState("2.5");

  useEffect(() => {
    if (!timerOn) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 0.1);
    }, 100);

    return () => clearInterval(interval);
  }, [timerOn, seconds]);

  // 2.5 GPM = high flow?, US federal regulation since 1992
  // 2.0 GPM = medium flow?, EPA WaterSense program
  // 1.8 GPM = low flow?, maximum in california & other states

  return (
    <>
      <h1 className="text-3xl font-bold">Shower Timer</h1>

      <div className="mx-auto w-full md:w-96">
        <div className="flex gap-2 mt-8">
          <select
            onChange={(e) => setGPMInput(e.currentTarget.value)}
            value={gpmInput}
            className="selectArrows bg-transparent w-full text-sm md:text-base text-center rounded-md border-2 border-gray-300 hover:bg-gray-200 focus:bg-gray-200 px-3 py-1.5 transition"
          >
            <optgroup label="Select shower head's gallons per minute">
              <option value="1.8">
                Very low flow (1.8 gal/min, 6.8 L/min)
              </option>
              <option value="2.0">Low flow (2.0 gal/min, 7.6 L/min)</option>
              <option value="2.5">Medium flow (2.5 gal/min, 9.5 L/min)</option>
              <option value="3.0">High flow (3.0 gal/min, 11.4 L/min)</option>
              <option value="custom">Custom</option>
            </optgroup>
          </select>

          <input
            className={`${
              gpmInput == "custom" ? "" : "hidden"
            } bg-transparent w-1/4 text-sm md:text-base rounded-md border-2 border-gray-300 hover:bg-gray-200 focus:bg-gray-200 transition px-3 py-2`}
            onInput={(e) => setGPMCustom(Number(e.currentTarget.value))}
            value={gpmCustom}
            type="number"
            placeholder="GPM"
            min={0.1}
            max={10}
            step={0.1}
          ></input>
        </div>

        <div className="flex gap-2 mt-2">
          <button
            className="w-full text-sm md:text-base border-2 border-gray-300 hover:bg-gray-200 active:bg-gray-300 cursor-pointer rounded-md px-3 py-1.5 transition"
            onClick={() => {
              setTimerOn(!timerOn);
            }}
          >
            {timerOn ? "Pause" : seconds > 0 ? "Resume" : "Start"}
          </button>
          <button
            className="w-full text-sm md:text-base border-2 border-gray-300 hover:bg-gray-200 active:bg-gray-300 cursor-pointer rounded-md px-3 py-1.5 transition"
            onClick={() => {
              setSeconds(0);
              setTimerOn(false);
            }}
          >
            Restart
          </button>
        </div>
      </div>

      <div>
        <div className="text-9xl md:text-[12rem] leading-[0.9] font-bold bg-clip-text text-transparent bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-500 mt-12">
          {(
            (seconds / 60) *
            (gpmInput !== "custom" ? Number(gpmInput) : gpmCustom)
          ).toFixed(1)}
        </div>
        <div className="text-2xl">
          gallons (
          {(
            (seconds / 60) *
            (gpmInput !== "custom" ? Number(gpmInput) : gpmCustom) *
            3.78541
          ).toFixed(1)}{" "}
          liters)
        </div>
      </div>

      <div>
        <div className="text-5xl md:text-6xl leading-[0.9] font-bold mt-8">
          {seconds.toFixed(1)}
        </div>
        <div className="text-lg">seconds</div>
      </div>

      <div>
        <div className="text-lg text-pretty mt-16">
          How that water could have been used
          <FontAwesomeIcon icon={faArrowDown} className="ml-2" />
        </div>
      </div>
    </>
  );
}
