import { Parameter } from './types';

// ===== SET A — PARAMETER PROGRAM KERJA (14 parameters, total 100%) =====

export const PROKER_PARAMETERS: Parameter[] = [
  {
    code: 'A1',
    name: 'Kesesuaian dengan AD/ART IKM PNJ dan Ketetapan MPM PNJ',
    weight: 8,
    legalBasis: 'TAP 008 Pasal 36 ayat (3) huruf a dan b; AD/ART IKM PNJ',
    description:
      'Setiap Program Kerja wajib tidak bertentangan dengan AD/ART IKM PNJ serta seluruh ketetapan MPM PNJ yang berlaku, mencakup tujuan, mekanisme, peserta, maupun output.',
    scoreDescriptions: [
      { score: 0, label: 'Tidak Terpenuhi', description: 'Kegiatan secara nyata bertentangan dengan AD/ART atau ketetapan MPM PNJ.' },
      { score: 25, label: 'Kurang', description: 'Sebagian kecil sesuai; terdapat pelanggaran signifikan terhadap norma dasar organisasi.' },
      { score: 50, label: 'Cukup', description: 'Sebagian besar sesuai; terdapat ketidaksesuaian minor yang tidak bersifat prinsipil.' },
      { score: 75, label: 'Baik', description: 'Sepenuhnya sesuai dengan AD/ART dan seluruh ketetapan MPM PNJ yang berlaku.' },
    ],
  },
  {
    code: 'A2',
    name: 'Kesesuaian dengan Garis-Garis Besar Haluan Kerja HMJ',
    weight: 7,
    legalBasis: 'TAP 002/TAP/MPM PNJ/II/2026 GBHK HMJ; TAP 008/2025 Pasal 36 ayat (3) huruf e',
    description:
      'Program Kerja wajib selaras dengan GBHK HMJ, mencakup seluruh 16 asas dan 12 aspek. Setiap kegiatan harus dapat dikaitkan dengan minimal satu asas atau aspek GBHK.',
    scoreDescriptions: [
      { score: 0, label: 'Tidak Terpenuhi', description: 'Tidak mencerminkan satupun asas atau aspek GBHK HMJ yang berlaku.' },
      { score: 25, label: 'Kurang', description: 'Mencerminkan sebagian kecil asas/aspek GBHK; arah kebijakan belum selaras.' },
      { score: 50, label: 'Cukup', description: 'Mencerminkan sebagian besar asas/aspek GBHK; keselarasan cukup baik.' },
      { score: 75, label: 'Baik', description: 'Seluruh pelaksanaan selaras penuh dengan GBHK HMJ yang disusun MPM.' },
    ],
  },
  {
    code: 'A3',
    name: 'Kesesuaian dengan Mekanisme Pengawasan Kelembagaan MPM PNJ',
    weight: 5,
    legalBasis: 'TAP 008 Pasal 26 ayat (1) dan (2); Pasal 36 ayat (3) huruf c',
    description:
      'Pelaksanaan wajib berjalan sesuai mekanisme pengawasan MPM PNJ, mencakup kepatuhan terhadap prosedur pelaporan, perizinan, dan koordinasi dengan SC.',
    scoreDescriptions: [
      { score: 0, label: 'Tidak Terpenuhi', description: 'Tidak mengikuti mekanisme pengawasan MPM sama sekali; tidak ada koordinasi.' },
      { score: 25, label: 'Kurang', description: 'Mengikuti sebagian kecil mekanisme; banyak prosedur yang dilewati tanpa komunikasi.' },
      { score: 50, label: 'Cukup', description: 'Mengikuti sebagian besar mekanisme; penyimpangan minor telah dikomunikasikan ke MPM.' },
      { score: 75, label: 'Baik', description: 'Seluruh kegiatan berjalan sesuai mekanisme pengawasan kelembagaan MPM PNJ.' },
    ],
  },
  {
    code: 'A4',
    name: 'Kesesuaian dengan Rancangan Kerja yang Disahkan',
    weight: 15,
    legalBasis: 'TAP 008 Pasal 13 ayat (2); Pasal 27 ayat (3) dan (4); Pasal 36 ayat (3) huruf g dan ayat (6) huruf a',
    description:
      'Pelaksanaan riil dibandingkan dengan susunan yang disahkan dalam Sidang Rapat Kerja. Perubahan wajib dilaporkan melalui Rapat Kerja Insidental.',
    scoreDescriptions: [
      { score: 0, label: 'Tidak Terpenuhi', description: 'Pelaksanaan sangat berbeda dari Rancangan Kerja yang disahkan MPM PNJ.' },
      { score: 25, label: 'Kurang', description: 'Sebagian kecil sesuai Raker; banyak deviasi tanpa pelaporan kepada MPM.' },
      { score: 50, label: 'Cukup', description: 'Sebagian besar sesuai Raker; deviasi minor telah dilaporkan ke MPM PNJ.' },
      { score: 75, label: 'Baik', description: 'Seluruh pelaksanaan sesuai Rancangan Kerja yang disahkan dalam Sidang Raker.' },
    ],
  },
  {
    code: 'A5',
    name: 'Ketepatan Waktu Pengajuan Proposal/KAK',
    weight: 8,
    legalBasis: 'TAP 008 Pasal 13 ayat (4a) dan (4b); Pasal 15 ayat (1); Pasal 16 ayat (1)',
    description:
      'Proposal atau KAK wajib diajukan kepada MPM PNJ selambat-lambatnya: Proker Kecil 2 minggu, Proker Besar 1 bulan sebelum pelaksanaan.',
    baselineNote: 'Baseline 50 jika tahap pengajuan proposal belum tercapai saat R100HK.',
    scoreDescriptions: [
      { score: 0, label: 'Tidak Terpenuhi', description: 'Tidak ada Proposal/KAK yang diajukan sama sekali.' },
      { score: 25, label: 'Kurang', description: 'Proposal/KAK ada namun diajukan kurang dari setengah batas waktu minimum.' },
      { score: 50, label: 'Cukup', description: 'Proposal/KAK diajukan mendekati batas waktu minimum.' },
      { score: 75, label: 'Baik', description: 'Proposal/KAK diajukan tepat waktu (minimal 2 minggu/1 bulan) sebelum kegiatan.' },
    ],
  },
  {
    code: 'A6',
    name: 'Kesesuaian Pelaksanaan dengan Proposal/KAK yang Disahkan',
    weight: 8,
    legalBasis: 'TAP 008 Pasal 36 ayat (3) huruf h',
    description:
      'Pelaksanaan harus sesuai dengan Proposal/KAK yang telah disahkan MPM PNJ, meliputi seluruh komponen proposal.',
    baselineNote: 'Baseline 50 jika tahap pelaksanaan belum tercapai saat R100HK.',
    scoreDescriptions: [
      { score: 0, label: 'Tidak Terpenuhi', description: 'Pelaksanaan menyimpang jauh dari dokumen Proposal/KAK yang disahkan.' },
      { score: 25, label: 'Kurang', description: 'Sebagian kecil sesuai; banyak komponen kegiatan berbeda dari Proposal/KAK.' },
      { score: 50, label: 'Cukup', description: 'Sebagian besar pelaksanaan sesuai dokumen; perubahan telah dikomunikasikan.' },
      { score: 75, label: 'Baik', description: 'Seluruh pelaksanaan sepenuhnya sesuai dengan Proposal/KAK yang disahkan MPM.' },
    ],
  },
  {
    code: 'A7',
    name: 'Ketepatan Waktu Pelaksanaan',
    weight: 10,
    legalBasis: 'TAP 008 Pasal 36 ayat (6) huruf b',
    description:
      'Waktu pelaksanaan harus sesuai Rancangan Kerja dengan toleransi keterlambatan maksimal 7 hari. HMJ wajib berkoordinasi dengan MPM sebelum keterlambatan terjadi.',
    baselineNote: 'Baseline 50 jika tahap pelaksanaan belum tercapai saat R100HK.',
    scoreDescriptions: [
      { score: 0, label: 'Tidak Terpenuhi', description: 'Keterlambatan lebih dari 7 hari tanpa koordinasi sama sekali dengan MPM PNJ.' },
      { score: 25, label: 'Kurang', description: 'Keterlambatan lebih dari 7 hari; koordinasi dilakukan namun setelah fakta.' },
      { score: 50, label: 'Cukup', description: 'Keterlambatan maksimal 7 hari; koordinasi dilakukan terlebih dahulu dengan MPM.' },
      { score: 75, label: 'Baik', description: 'Pelaksanaan tepat waktu sesuai Rancangan Kerja; tidak ada keterlambatan.' },
    ],
  },
  {
    code: 'A8',
    name: 'Capaian Target dan Parameter Keberhasilan Kegiatan',
    weight: 10,
    legalBasis: 'TAP 008 Pasal 13 ayat (2); Pasal 36 ayat (1), ayat (6) huruf a',
    description:
      'Keberhasilan diukur berdasarkan parameter dan target dalam Rancangan Kerja dan Proposal/KAK, mencakup target kuantitatif dan kualitatif.',
    baselineNote: 'Baseline 50 jika tahap pelaksanaan belum tercapai saat R100HK.',
    scoreDescriptions: [
      { score: 0, label: 'Tidak Terpenuhi', description: 'Target tidak tercapai; parameter keberhasilan tidak terpenuhi.' },
      { score: 25, label: 'Kurang', description: 'Target tercapai kurang dari 50%; efektivitas kegiatan sangat rendah.' },
      { score: 50, label: 'Cukup', description: 'Target tercapai 50–79%; efektivitas dan efisiensi kegiatan cukup baik.' },
      { score: 75, label: 'Baik', description: 'Seluruh target (80% ke atas) dan parameter keberhasilan tercapai sesuai Raker/Proposal.' },
    ],
  },
  {
    code: 'A9',
    name: 'Intensitas dan Kualitas Rapat Pleno OC bersama SC',
    weight: 7,
    legalBasis: 'TAP 008 Pasal 8 ayat (3) huruf c; Pasal 10; Pasal 36 ayat (6) huruf c angka 2',
    description:
      'OC wajib mengadakan rapat pleno internal bersama SC/MPM Distrik selama tahapan berlangsung. Rapat pleno mencakup tahap pra-kegiatan, pelaksanaan, dan pasca-kegiatan.',
    baselineNote: 'Baseline 50 jika tahap pelaksanaan dan rapat pleno belum tercapai saat R100HK.',
    scoreDescriptions: [
      { score: 0, label: 'Tidak Terpenuhi', description: 'Tidak ada rapat pleno OC bersama SC dalam satupun tahapan program kerja.' },
      { score: 25, label: 'Kurang', description: 'Rapat pleno hanya dilakukan pada satu tahapan; tahapan lain tidak ada rapat.' },
      { score: 50, label: 'Cukup', description: 'Rapat pleno dilakukan di sebagian besar tahapan; ada tahapan yang terlewat.' },
      { score: 75, label: 'Baik', description: 'Rapat pleno OC bersama SC dilakukan secara aktif di seluruh tahapan kegiatan.' },
    ],
  },
  {
    code: 'A10',
    name: 'Koordinasi Project Officer dengan Steering Committee MPM Distrik',
    weight: 5,
    legalBasis: 'TAP 008 Pasal 8 ayat (3) huruf c; Pasal 36 ayat (6) huruf c angka 2; Pasal 36 ayat (8)',
    description:
      'PO HMJ wajib berkoordinasi secara aktif dengan SC pada MPM Distrik (Komisi III) di seluruh tahapan.',
    baselineNote: 'Baseline 50 jika tahap pelaksanaan belum tercapai saat R100HK.',
    scoreDescriptions: [
      { score: 0, label: 'Tidak Terpenuhi', description: 'Tidak ada koordinasi antara PO dan SC/MPM Distrik dalam satupun tahapan.' },
      { score: 25, label: 'Kurang', description: 'Koordinasi hanya pada satu tahapan; keputusan penting banyak diambil tanpa SC.' },
      { score: 50, label: 'Cukup', description: 'Koordinasi di sebagian besar tahapan; ada keputusan penting yang diambil tanpa SC.' },
      { score: 75, label: 'Baik', description: 'PO berkoordinasi aktif dengan SC MPM Distrik di seluruh tahapan kegiatan.' },
    ],
  },
  {
    code: 'A11',
    name: 'Pelaporan Progres kepada MPM PNJ',
    weight: 5,
    legalBasis: 'ART IKM PNJ Pasal 34 ayat (3); TAP 008 Pasal 26 ayat (4); Pasal 30',
    description:
      'HMJ wajib memberikan laporan lisan dan tertulis kepada MPM PNJ secara berkala dan/atau bila diminta.',
    baselineNote: 'Baseline 50 jika kegiatan belum selesai atau belum ada progres signifikan.',
    scoreDescriptions: [
      { score: 0, label: 'Tidak Terpenuhi', description: 'Tidak ada pelaporan progres kepada MPM PNJ dalam bentuk apapun.' },
      { score: 25, label: 'Kurang', description: 'Pelaporan hanya dilakukan saat diminta MPM; tidak ada inisiatif pelaporan proaktif.' },
      { score: 50, label: 'Cukup', description: 'Pelaporan dilakukan secara berkala; sebagian besar ketentuan pelaporan terpenuhi.' },
      { score: 75, label: 'Baik', description: 'Pelaporan dilakukan proaktif dan responsif saat diminta; seluruh ketentuan terpenuhi.' },
    ],
  },
  {
    code: 'A12',
    name: 'Akuntabilitas Keuangan Kegiatan',
    weight: 5,
    legalBasis: 'AD IKM PNJ Pasal 17 ayat (1)–(4); Pasal 18 ayat (2) dan (4); ART IKM PNJ Pasal 50 ayat (1); Pasal 53',
    description:
      'Pengelolaan keuangan wajib berlandaskan prinsip transparansi, keadilan, dan akuntabilitas. Setiap transaksi wajib dibukukan dan disertai bukti yang sah.',
    baselineNote: 'Baseline 50 jika kegiatan belum selesai dan laporan keuangan belum final.',
    scoreDescriptions: [
      { score: 0, label: 'Tidak Terpenuhi', description: 'Tidak ada laporan keuangan; tidak ada bukti transaksi yang sah.' },
      { score: 25, label: 'Kurang', description: 'Laporan ada namun tidak transparan; sebagian transaksi tidak disertai bukti sah.' },
      { score: 50, label: 'Cukup', description: 'Laporan keuangan disusun; sebagian besar transaksi disertai bukti yang sah.' },
      { score: 75, label: 'Baik', description: 'Laporan keuangan lengkap dan terbuka; seluruh transaksi terdokumentasi dengan bukti sah.' },
    ],
  },
  {
    code: 'A13',
    name: 'Kelengkapan dan Ketepatan Waktu LPJ Kepanitiaan',
    weight: 8,
    legalBasis: 'TAP 008 Pasal 31 ayat (3); Pasal 32; Pasal 37 ayat (3); Pasal 38 ayat (2)',
    description:
      'LPJ kepanitiaan wajib diserahkan maksimal 1 minggu setelah kegiatan dan menjadi syarat pengajuan Program Kerja berikutnya.',
    baselineNote: 'Baseline 50 jika kegiatan belum selesai sehingga LPJ belum relevan.',
    scoreDescriptions: [
      { score: 0, label: 'Tidak Terpenuhi', description: 'LPJ tidak diserahkan atau diserahkan lebih dari 2 minggu setelah kegiatan.' },
      { score: 25, label: 'Kurang', description: 'LPJ diserahkan lebih dari 1 minggu setelah kegiatan; isi tidak lengkap.' },
      { score: 50, label: 'Cukup', description: 'LPJ diserahkan maksimal 1 minggu; sebagian aspek penilaian terpenuhi.' },
      { score: 75, label: 'Baik', description: 'LPJ diserahkan tepat waktu (maksimal 1 minggu); seluruh 8 aspek terpenuhi.' },
    ],
  },
  {
    code: 'A14',
    name: 'Ketertiban Administrasi dan Kesekretariatan',
    weight: 4,
    legalBasis: 'AD/ART IKM PNJ; Pedkes; Panduan Kemahasiswaan Bab II No.2.5(8)',
    description:
      'Seluruh dokumen formal wajib mengikuti Pedoman Kesekretariatan IKM PNJ (Pedkes), termasuk format kop surat, nomor surat, dan pengesahan.',
    baselineNote: 'Baseline 50 jika belum ada dokumen formal yang dapat dinilai.',
    scoreDescriptions: [
      { score: 0, label: 'Tidak Terpenuhi', description: 'Dokumen formal tidak mengikuti format Pedkes sama sekali.' },
      { score: 25, label: 'Kurang', description: 'Sebagian kecil dokumen sesuai Pedkes; banyak ketidaksesuaian format.' },
      { score: 50, label: 'Cukup', description: 'Sebagian besar dokumen sesuai Pedkes; terdapat kesalahan minor pada format.' },
      { score: 75, label: 'Baik', description: 'Seluruh dokumen formal mengikuti Pedoman Kesekretariatan IKM PNJ dengan benar.' },
    ],
  },
];

// ===== SET B — PARAMETER AGENDA (9 parameters, total 100%) =====

export const AGENDA_PARAMETERS: Parameter[] = [
  {
    code: 'B1',
    name: 'Kesesuaian dengan AD/ART IKM PNJ dan Ketetapan MPM PNJ',
    weight: 12,
    legalBasis: 'TAP 008 Pasal 36 ayat (3) huruf a dan b; AD/ART IKM PNJ; ART Pasal 34 ayat (1)',
    description:
      'Setiap Agenda wajib tidak bertentangan dengan AD/ART IKM PNJ serta seluruh ketetapan MPM PNJ. Meskipun bersifat internal, norma dasar organisasi tetap mengikat penuh.',
    scoreDescriptions: [
      { score: 0, label: 'Tidak Terpenuhi', description: 'Agenda secara nyata bertentangan dengan AD/ART atau ketetapan MPM PNJ.' },
      { score: 25, label: 'Kurang', description: 'Sebagian kecil sesuai; terdapat pelanggaran signifikan terhadap norma dasar.' },
      { score: 50, label: 'Cukup', description: 'Sebagian besar sesuai; terdapat ketidaksesuaian minor yang tidak prinsipil.' },
      { score: 75, label: 'Baik', description: 'Sepenuhnya sesuai dengan AD/ART dan seluruh ketetapan MPM PNJ yang berlaku.' },
    ],
  },
  {
    code: 'B2',
    name: 'Kesesuaian dengan Garis-Garis Besar Haluan Kerja HMJ',
    weight: 12,
    legalBasis: 'TAP 002/TAP/MPM PNJ/II/2026 GBHK HMJ; TAP 008/2025 Pasal 36 ayat (3) huruf e',
    description:
      'Agenda wajib mencerminkan asas dan aspek GBHK HMJ yang disusun MPM PNJ. Seluruh Agenda harus dapat dikaitkan dengan minimal satu dari 16 asas dan 12 aspek GBHK.',
    scoreDescriptions: [
      { score: 0, label: 'Tidak Terpenuhi', description: 'Tidak mencerminkan satupun asas atau aspek GBHK HMJ yang berlaku.' },
      { score: 25, label: 'Kurang', description: 'Mencerminkan sebagian kecil asas/aspek GBHK; arah kebijakan belum selaras.' },
      { score: 50, label: 'Cukup', description: 'Mencerminkan sebagian besar asas/aspek GBHK; keselarasan cukup baik.' },
      { score: 75, label: 'Baik', description: 'Seluruh pelaksanaan Agenda selaras penuh dengan GBHK HMJ yang disusun MPM.' },
    ],
  },
  {
    code: 'B3',
    name: 'Kesesuaian dengan Mekanisme Pengawasan Kelembagaan MPM PNJ',
    weight: 8,
    legalBasis: 'TAP 008 Pasal 26 ayat (1) dan (2); Pasal 36 ayat (3) huruf c',
    description:
      'Pelaksanaan Agenda wajib sesuai mekanisme pengawasan MPM PNJ. HMJ tetap wajib mengikuti prosedur koordinasi dan pelaporan kepada MPM PNJ.',
    scoreDescriptions: [
      { score: 0, label: 'Tidak Terpenuhi', description: 'Tidak mengikuti mekanisme pengawasan MPM sama sekali.' },
      { score: 25, label: 'Kurang', description: 'Mengikuti sebagian kecil mekanisme; prosedur koordinasi banyak dilewati.' },
      { score: 50, label: 'Cukup', description: 'Mengikuti sebagian besar mekanisme; penyimpangan minor telah dikomunikasikan.' },
      { score: 75, label: 'Baik', description: 'Seluruh Agenda berjalan sesuai mekanisme pengawasan kelembagaan MPM PNJ.' },
    ],
  },
  {
    code: 'B4',
    name: 'Kesesuaian dengan Rancangan Kerja yang Disahkan',
    weight: 20,
    legalBasis: 'TAP 008 Pasal 13 ayat (2); Pasal 27 ayat (3) dan (4); Pasal 36 ayat (3) huruf g dan ayat (6) huruf a',
    description:
      'Pelaksanaan Agenda dibandingkan dengan susunan yang disahkan dalam Sidang Rapat Kerja. Rancangan Kerja adalah satu-satunya dokumen perencanaan formal untuk Agenda, sehingga parameter ini berbobot paling besar.',
    scoreDescriptions: [
      { score: 0, label: 'Tidak Terpenuhi', description: 'Pelaksanaan sangat berbeda dari Rancangan Kerja yang disahkan MPM PNJ.' },
      { score: 25, label: 'Kurang', description: 'Sebagian kecil Agenda sesuai Raker; banyak deviasi tanpa pelaporan ke MPM.' },
      { score: 50, label: 'Cukup', description: 'Sebagian besar Agenda sesuai Raker; deviasi minor telah dilaporkan ke MPM.' },
      { score: 75, label: 'Baik', description: 'Seluruh pelaksanaan Agenda sesuai Rancangan Kerja yang disahkan dalam Sidang Raker.' },
    ],
  },
  {
    code: 'B5',
    name: 'Ketepatan Waktu Pelaksanaan',
    weight: 15,
    legalBasis: 'TAP 008 Pasal 36 ayat (6) huruf b',
    description:
      'Waktu pelaksanaan harus sesuai Rancangan Kerja dengan toleransi keterlambatan maksimal 7 hari. HMJ wajib berkoordinasi dengan MPM sebelum keterlambatan terjadi.',
    baselineNote: 'Baseline 50 jika Agenda memang belum jadwalnya terlaksana saat R100HK.',
    scoreDescriptions: [
      { score: 0, label: 'Tidak Terpenuhi', description: 'Keterlambatan lebih dari 7 hari tanpa koordinasi dengan MPM PNJ.' },
      { score: 25, label: 'Kurang', description: 'Keterlambatan lebih dari 7 hari; koordinasi dilakukan namun setelah fakta.' },
      { score: 50, label: 'Cukup', description: 'Keterlambatan maksimal 7 hari; koordinasi dilakukan terlebih dahulu dengan MPM.' },
      { score: 75, label: 'Baik', description: 'Agenda terlaksana tepat waktu sesuai Rancangan Kerja; tidak ada keterlambatan.' },
    ],
  },
  {
    code: 'B6',
    name: 'Capaian Target dan Parameter Keberhasilan Agenda',
    weight: 15,
    legalBasis: 'TAP 008 Pasal 13 ayat (2); Pasal 36 ayat (1) dan ayat (6) huruf a',
    description:
      'Keberhasilan diukur berdasarkan target dan parameter keberhasilan dalam Rancangan Kerja. Target Agenda umumnya bersifat internal.',
    baselineNote: 'Baseline 50 jika Agenda belum terlaksana saat R100HK.',
    scoreDescriptions: [
      { score: 0, label: 'Tidak Terpenuhi', description: 'Target tidak tercapai; parameter keberhasilan Agenda tidak terpenuhi.' },
      { score: 25, label: 'Kurang', description: 'Target tercapai kurang dari 50%; efektivitas Agenda sangat rendah.' },
      { score: 50, label: 'Cukup', description: 'Target tercapai 50–79%; efektivitas Agenda cukup baik.' },
      { score: 75, label: 'Baik', description: 'Seluruh target (80% ke atas) dan parameter keberhasilan Agenda tercapai sesuai Raker.' },
    ],
  },
  {
    code: 'B7',
    name: 'Pelaporan Progres kepada MPM PNJ',
    weight: 8,
    legalBasis: 'ART IKM PNJ Pasal 34 ayat (3); TAP 008 Pasal 26 ayat (4); Pasal 30',
    description:
      'HMJ wajib memberikan laporan lisan dan tertulis kepada MPM PNJ atas pelaksanaan Agenda secara berkala dan/atau bila diminta.',
    baselineNote: 'Baseline 50 jika Agenda belum terlaksana saat R100HK.',
    scoreDescriptions: [
      { score: 0, label: 'Tidak Terpenuhi', description: 'Tidak ada pelaporan progres Agenda kepada MPM PNJ dalam bentuk apapun.' },
      { score: 25, label: 'Kurang', description: 'Pelaporan hanya dilakukan saat diminta MPM; tidak ada inisiatif proaktif.' },
      { score: 50, label: 'Cukup', description: 'Pelaporan cukup berkala; sebagian besar permintaan MPM direspons dengan baik.' },
      { score: 75, label: 'Baik', description: 'Pelaporan dilakukan proaktif dan responsif; seluruh ketentuan pelaporan terpenuhi.' },
    ],
  },
  {
    code: 'B8',
    name: 'Akuntabilitas Keuangan Agenda',
    weight: 5,
    legalBasis: 'AD IKM PNJ Pasal 18 ayat (2) dan (4); ART IKM PNJ Pasal 50 ayat (1); Pasal 53',
    description:
      'Apabila Agenda melibatkan transaksi dana, pengelolaan wajib berlandaskan transparansi, keadilan, dan akuntabilitas. Jika tidak ada transaksi, dinilai berdasarkan ketertiban pencatatan nihil keuangan.',
    scoreDescriptions: [
      { score: 0, label: 'Tidak Terpenuhi', description: 'Ada transaksi keuangan namun tidak ada laporan atau bukti sah sama sekali.' },
      { score: 25, label: 'Kurang', description: 'Laporan ada namun tidak transparan; sebagian transaksi tanpa bukti yang sah.' },
      { score: 50, label: 'Cukup', description: 'Laporan keuangan disusun; sebagian besar transaksi disertai bukti yang sah.' },
      { score: 75, label: 'Baik', description: 'Laporan keuangan lengkap atau tercatat nihil; seluruh transaksi terdokumentasi dengan bukti sah.' },
    ],
  },
  {
    code: 'B9',
    name: 'Ketertiban Administrasi dan Kesekretariatan',
    weight: 5,
    legalBasis: 'AD/ART IKM PNJ; Pedkes; TAP 009/TAP/MPM PNJ/VII/2025 Pasal 11',
    description:
      'Dokumen formal dari Agenda wajib mengikuti Pedoman Kesekretariatan IKM PNJ. Publikasi internal media cetak wajib dilegalisasi HMJ di bawah pengawasan MPM Perwakilan Jurusan.',
    scoreDescriptions: [
      { score: 0, label: 'Tidak Terpenuhi', description: 'Dokumen dari Agenda tidak mengikuti format Pedkes sama sekali.' },
      { score: 25, label: 'Kurang', description: 'Sebagian kecil dokumen sesuai Pedkes; banyak ketidaksesuaian format.' },
      { score: 50, label: 'Cukup', description: 'Sebagian besar dokumen sesuai Pedkes; terdapat kesalahan minor pada format.' },
      { score: 75, label: 'Baik', description: 'Seluruh dokumen dari Agenda mengikuti Pedoman Kesekretariatan IKM PNJ.' },
    ],
  },
];
