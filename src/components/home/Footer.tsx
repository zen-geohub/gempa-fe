import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function Footer() {
  return (
    <div className="h-dvh w-dvw flex flex-col gap-4 items-center">
      <div className="w-dvw h-[50dvh] bg-slate-950 flex flex-col gap-4 justify-center items-center py-4 px-12 dark:bg-white">
        <h1 className="font-bold text-3xl font-poppins text-white dark:text-slate-950">
          Uji Usabilitas
        </h1>
        <Separator className="w-12" />
        <p className="text-white font-poppins text-center">
          Pengguna diharapkan memberikan penilaian dan/atau evaluasi terhadap
          aplikasi ini sebagai bahan pengujian pengembang dalam melakukan
          penyempurnaan.
        </p>
        <Button variant="secondary">
          <a href="https://forms.gle/HvtpcCf7GRmPk7SF6" target="_blank">
            Isi Survei
          </a>
        </Button>
      </div>
      <div className="w-dvw h-[50dvh] bg-white dark:bg-slate-950 flex flex-col gap-2 lg:gap-4 justify-center items-center py-4 px-12 ">
        <h1 className="font-bold text-3xl font-poppins dark:text-white text-slate-950">
          Informasi
        </h1>
        <Separator className="w-12" />
        <p className="font-poppins text-justify lg:text-center">
          WebGIS ini dikembangkan oleh Muh. Zaenal Abidin dibawah supervisi Heri
          Sutanta, S.T., M.Sc., Ph.D. sebagai bagian dari tugas akhir mahasiswa
          Sarjana Teknik Geodesi, Universitas Gadjah Mada.
        </p>
        <div className="flex gap-4">
          <Card className="hidden lg:flex lg:flex-col lg:flex-1">
            <CardHeader>
              <CardTitle className="text-center text-xl">Alamat</CardTitle>
            </CardHeader>
            <CardContent>
              Jl. Grafika Bulaksumur No.2, Sendowo, Sinduadi, Kabupaten Sleman,
              Daerah Istimewa Yogyakarta 55281
            </CardContent>
          </Card>
          <Card className="">
            <CardHeader>
              <CardTitle className="text-center text-xl">Email</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              muh.z.a@mail.ugm.ac.id
            </CardContent>
          </Card>
        </div>
      </div>
      <footer className="h-8 lg:h-1 w-dvw bg-white dark:bg-slate-950"></footer>
    </div>
  );
}

export default Footer;
