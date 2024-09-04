import {
  DashboardIcon,
  GearIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";

function KeyFeatures() {
  return (
    <div className="h-[calc(100dvh-64px)] w-dvw flex flex-col gap-4 items-center px-12 py-4 lg:h-fit lg:justify-center lg:py-8">
      <h1 className="font-bold text-3xl font-poppins dark:text-white">
        Fitur Utama
      </h1>
      <Separator className="w-24" />
      <div className="flex flex-col gap-4 lg:flex-row lg:gap-12 lg:justify-between">
        <Card className="flex-1 hover:shadow-lg">
          <CardHeader className="p-4 lg:p-6">
            <div className="flex flex-col items-center text-center gap-2 text-sm lg:text-base">
              <GearIcon className="w-8 h-8 lg:w-[72px] lg:h-[72px]" />
              <CardTitle>Fleksibilitas dalam Menampilkan Data</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-4 lg:p-6 pt-0 lg:pt-0">
            <CardDescription className="text-justify text-xs lg:text-base">
              Pengguna dapat memilih rentang waktu hingga 5 tahun untuk
              memvisualisasikan data sesuai kebutuhan.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="flex-1 hover:shadow-lg">
          <CardHeader className="p-4 lg:p-6">
            <div className="flex flex-col items-center gap-2 text-sm lg:text-base">
              <DashboardIcon className="w-8 h-8 lg:w-[72px] lg:h-[72px]" />
              <CardTitle>Penyajian Data Secara Interaktif</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-4 lg:p-6 pt-0 lg:pt-0">
            <CardDescription className="text-justify text-xs lg:text-base">
              Pengguna dapat menikmati data dalam tampilan 2D dan 3D.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="flex-1 hover:shadow-lg">
          <CardHeader className="p-4 lg:p-6">
            <div className="flex flex-col items-center gap-2 text-sm lg:text-base">
              <MixerHorizontalIcon className="w-8 h-8 lg:w-[72px] lg:h-[72px]" />
              <CardTitle>Filterisasi Data</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-4 lg:p-6 pt-0 lg:pt-0">
            <CardDescription className="text-justify text-xs lg:text-base">
              Pengguna dapat menelusuri kejadian berdasarkan tanggal, magnitudo,
              kedalaman, dan klasifikasi untuk wawasan yang lebih mendalam.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default KeyFeatures;
