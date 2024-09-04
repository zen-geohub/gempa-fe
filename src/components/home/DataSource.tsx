import { Separator } from "../ui/separator";

function DataSource() {
  return (
    <div className="h-[calc(50dvh-64px)] w-dvw flex flex-col gap-4 items-center px-12 py-8 font-poppins bg-slate-950 text-white dark:bg-white dark:text-black lg:justify-center lg:h-fit lg:py-14">
      <h1 className="font-bold text-3xl ">Sumber Data</h1>
      <Separator className="w-12" />
      <p className="text-justify lg:text-center text-sm lg:text-base">
        Data yang digunakan bersumber dari lembaga resmi, yaitu{" "} <br className="hidden lg:block"/>
        <span className="font-semibold">
          Badan Meteorologi, Klimatologi, dan Geofisika (BMKG)
        </span>{" "}
        dan{" "}
        <span className="font-semibold">
          Badan Nasional Penanggulangan Bencana (BNPB).
        </span>
      </p>
    </div>
  );
}

export default DataSource;
