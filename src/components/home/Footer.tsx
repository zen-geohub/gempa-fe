import { Button } from "@/components/ui/button";
import { CardHeader, Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { EnvelopeClosedIcon, SewingPinIcon } from "@radix-ui/react-icons";

function Footer() {
  return (
    <div className="h-[calc(100dvh-62px)] w-dvw flex flex-col gap-4 items-center">
      <div className="w-dvw h-fit text-black dark:text-white dark:bg-slate-950 flex flex-col gap-4 justify-center items-center py-4 lg:py-8 px-6 lg:px-12">
        <h1 className="font-bold text-3xl font-poppins ">Uji Usabilitas</h1>
        <Separator className="w-12" />
        <p className="font-poppins text-center text-sm lg:text-base">
          Pengguna diharapkan memberikan penilaian dan/atau evaluasi terhadap
          aplikasi ini <br className="hidden lg:block" /> sebagai bahan
          pengujian pengembang dalam melakukan penyempurnaan.
        </p>
        <Button variant="secondary">
          <a href="https://forms.gle/HvtpcCf7GRmPk7SF6" target="_blank">
            Isi Survei
          </a>
        </Button>
      </div>
      <div className="w-dvw flex-1 text-white dark:text-black bg-slate-950 dark:bg-white flex flex-col gap-4 lg:gap-4 justify-center items-center py-4 px-6 lg:px-12 ">
        <h1 className="font-bold text-3xl font-poppins ">Informasi</h1>
        <Separator className="w-12" />
        <p className="font-poppins text-justify lg:text-center text-sm lg:text-base">
          WebGIS ini dikembangkan oleh Muh. Zaenal Abidin dibawah supervisi
          Bapak Heri Sutanta, S.T., M.Sc., Ph.D.{" "}
          <br className="hidden lg:block" /> sebagai bagian dari tugas akhir
          mahasiswa Sarjana Teknik Geodesi, Universitas Gadjah Mada.
        </p>
        <div className="flex justify-center gap-4 font-poppins">
          <Card className="hidden lg:flex w-2/6">
            <CardContent className="flex items-center p-3">
              <div>
              <SewingPinIcon className="w-fit h-16 "/>
              </div>
              <p className="">Jl. Grafika Bulaksumur No.2, Sendowo, Sinduadi, Kabupaten Sleman,
              Daerah Istimewa Yogyakarta 55281</p>
            </CardContent>
          </Card>
          <Card className="">
            <CardHeader className="items-center p-3">
              <EnvelopeClosedIcon className="w-fit h-12 lg:h-16 " />
            </CardHeader>
            <CardContent className="text-center text-sm lg:text-base">
              muh.z.a@mail.ugm.ac.id
            </CardContent>
          </Card>
        </div>
      </div>
      {/* <footer className="h-8 lg:h-1 w-dvw bg-slate-950 dark:bg-white"></footer> */}
    </div>
  );
}

export default Footer;
