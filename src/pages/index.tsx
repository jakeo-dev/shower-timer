import { faArrowDown, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function Home() {
  const [seconds, setSeconds] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  const [gpmInput, setGPMInput] = useState("2.5");
  const [gpmCustom, setGPMCustom] = useState(2.2);

  const [calculatedGallons, setCalculatedGallons] = useState(0.0);

  useEffect(() => {
    if (!timerOn) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 0.1);
    }, 100);

    return () => clearInterval(interval);
  }, [timerOn, seconds, gpmInput, gpmCustom]);

  useEffect(() => {
    setCalculatedGallons(
      (seconds / 60) * (gpmInput !== "custom" ? Number(gpmInput) : gpmCustom)
    );
  }, [seconds, gpmInput, gpmCustom]);

  // 2.5 GPM: US federallly regulated max since 1992
  // 2.0 GPM: EPA WaterSense program
  // 1.8 GPM: maximum in california & some other states

  return (
    <>
      <h1 className="text-3xl font-bold">Shower Timer</h1>

      <div className="mx-auto w-full md:w-96">
        <div className="w-full mt-8">
          <span className="text-sm text-gray-600 text-left">
            {`Select your shower head's flow rate`}
          </span>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={faInfoCircle}
              className="text-lg text-blue-600/80"
            />

            <select
              onChange={(e) => setGPMInput(e.currentTarget.value)}
              value={gpmInput}
              className="selectArrows bg-transparent w-full text-sm md:text-base text-center rounded-md border-2 border-gray-300 hover:bg-gray-200 focus:bg-gray-200 px-3 py-1.5 transition"
            >
              <optgroup label="Select your shower head's flow rate">
                <option value="1.5">
                  Very low flow (1.5 gal/min, 5.7 L/min)
                </option>
                <option value="1.8">Low flow (1.8 gal/min, 6.8 L/min)</option>
                <option value="2.0">
                  Medium flow (2.0 gal/min, 7.6 L/min)
                </option>
                <option value="2.5">High flow (2.5 gal/min, 9.5 L/min)</option>
                <option value="3.0">
                  Very high flow (3.0 gal/min, 11.4 L/min)
                </option>
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
            />
          </div>
        </div>

        <div className="flex gap-2 mt-2">
          <button
            className="w-full text-sm md:text-base text-white bg-blue-500 hover:bg-blue-600/90 active:bg-blue-700/80 cursor-pointer rounded-md px-3 py-1.5 transition"
            onClick={() => {
              setTimerOn(!timerOn);
            }}
          >
            {timerOn ? "Pause" : seconds > 0 ? "Unpause" : "Start"}
          </button>
          <button
            className={`${
              seconds > 0 ? "" : "hidden"
            } w-full text-sm md:text-base text-white bg-blue-500 hover:bg-blue-600/90 active:bg-blue-700/80 cursor-pointer rounded-md px-3 py-1.5 transition`}
            onClick={() => {
              setSeconds(0);
              setTimerOn(false);
            }}
          >
            Reset
          </button>
        </div>
      </div>

      <div>
        <div className="water-text text-9xl md:text-[14rem] leading-[0.9] font-extrabold mt-12">
          {calculatedGallons.toFixed(1)}
        </div>
        <div className="text-2xl text-gray-700">
          gallons ({(calculatedGallons * 3.78541).toFixed(1)} liters)
        </div>
      </div>

      <div className="text-5xl md:text-6xl leading-[0.9] font-bold mt-12">
        {seconds.toFixed(1)}
      </div>
      <div className="text-lg text-gray-700">seconds</div>

      <div className="bg-gray-900 text-white w-fit text-2xl md:text-3xl text-pretty rounded-xl px-6 py-4 mt-24 mx-auto">
        How that water was used
        <FontAwesomeIcon icon={faArrowDown} className="ml-3" />
      </div>

      <div className="water-text text-5xl md:text-6xl font-bold mt-12">
        {(calculatedGallons * 365).toFixed(1)}
      </div>
      <div className="text-lg text-gray-700">gallons per year</div>
      <div className="text-sm text-gray-700">
        (assuming one shower of the same length every day)
      </div>

      <div className="bg-gray-900 text-white w-fit text-2xl md:text-3xl text-pretty rounded-xl px-6 py-4 mt-24 mx-auto">
        How that water could have been used
        <FontAwesomeIcon icon={faArrowDown} className="ml-3" />
      </div>
    </>
  );
}
