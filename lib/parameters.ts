import { Parameter } from './types';

// ===== SET A — PARAMETER PROGRAM KERJA (14 parameters, total 100%) =====

export const PROKER_PARAMETERS: Parameter[] = [
  {
    code: 'A1',
    name: 'Kesesuaian dengan AD/ART IKM PNJ dan Ketetapan MPM PNJ',
    weight: 8,
    legalBasis: 'TAP 008/TAP/MPM PNJ/VII/2025 Pasal 36 ayat (3) huruf a dan b; AD/ART IKM PNJ',
    description:
      'Setiap Program Kerja yang dilaksanakan HMJ wajib tidak bertentangan dengan Anggaran Dasar dan Anggaran Rumah Tangga IKM PNJ serta seluruh ketetapan MPM PNJ yang berlaku. Kesesuaian ini mencakup tujuan kegiatan, mekanisme pelaksanaan, peserta, maupun output.',
    scoreDescriptions: [
      { score: 25, label: 'Tidak Terpenuhi', description: 'Kegiatan secara nyata bertentangan dengan AD/ART atau ketetapan MPM PNJ.' },
      { score: 50, label: 'Kurang', description: 'Sebagian kecil sesuai; terdapat pelanggaran signifikan terhadap norma dasar organisasi.' },
      { score: 75, label: 'Cukup', description: 'Sebagian besar sesuai; terdapat ketidaksesuaian minor yang tidak bersifat prinsipil.' },
      { score: 100, label: 'Baik', description: 'Sepenuhnya sesuai dengan AD/ART dan seluruh ketetapan MPM PNJ yang berlaku.' },
    ],
  },
  {
    code: 'A2',
    name: 'Kesesuaian dengan Garis-Garis Besar Haluan Kerja HMJ',
    weight: 7,
    legalBasis: 'TAP 002/TAP/MPM PNJ/II/2026 GBHK HMJ Bab I-B, Bab II-B, Bab III-C; TAP 008/2025 Pasal 36 ayat (3) huruf e',
    description:
      'Program Kerja wajib selaras dengan GBHK HMJ yang disusun MPM PNJ, mencakup seluruh 16 asas dan 12 aspek. Setiap kegiatan harus dapat dikaitkan dengan minimal satu asas atau aspek GBHK.',
    scoreDescriptions: [
      { score: 25, label: 'Tidak Terpenuhi', description: 'Tidak mencerminkan satu pun asas atau aspek GBHK HMJ yang berlaku.' },
      { score: 50, label: 'Kurang', description: 'Mencerminkan sebagian kecil asas/aspek GBHK; arah kebijakan belum selaras.' },
      { score: 75, label: 'Cukup', description: 'Mencerminkan sebagian besar asas/aspek GBHK; keselarasan cukup baik.' },
      { score: 100, label: 'Baik', description: 'Seluruh pelaksanaan selaras penuh dengan GBHK HMJ yang disusun MPM.' },
    ],
  },
  {
    code: 'A3',
    name: 'Kesesuaian dengan Mekanisme Pengawasan Kelembagaan MPM PNJ',
    weight: 5,
    legalBasis: 'TAP 008/TAP/MPM PNJ/VII/2025 Pasal 26 ayat (1) dan (2); Pasal 36 ayat (3) huruf c',
    description:
      'Pelaksanaan Program Kerja wajib berjalan sesuai mekanisme pengawasan yang ditetapkan MPM PNJ, mencakup kepatuhan terhadap prosedur pelaporan, perizinan, dan koordinasi dengan SC. Setiap penyimpangan dari prosedur wajib dikomunikasikan terlebih dahulu kepada MPM.',
    scoreDescriptions: [
      { score: 25, label: 'Tidak Terpenuhi', description: 'Tidak mengikuti mekanisme pengawasan MPM sama sekali; tidak ada koordinasi.' },
      { score: 50, label: 'Kurang', description: 'Mengikuti sebagian kecil mekanisme; banyak prosedur yang dilewati tanpa komunikasi.' },
      { score: 75, label: 'Cukup', description: 'Mengikuti sebagian besar mekanisme; penyimpangan minor telah dikomunikasikan ke MPM.' },
      { score: 100, label: 'Baik', description: 'Seluruh kegiatan berjalan sesuai mekanisme pengawasan kelembagaan MPM PNJ.' },
    ],
  },
  {
    code: 'A4',
    name: 'Kesesuaian dengan Rancangan Kerja yang Disahkan',
    weight: 15,
    legalBasis: 'TAP 008/TAP/MPM PNJ/VII/2025 Pasal 13 ayat (2); Pasal 27 ayat (3) dan (4); Pasal 36 ayat (3) huruf g dan ayat (6) huruf a',
    description:
      'Pelaksanaan riil Program Kerja dibandingkan dengan susunan yang telah disahkan dalam Sidang Rapat Kerja. Perubahan wajib melapor melalui Rapat Kerja Insidental disertai alasan yang jelas.',
    scoreDescriptions: [
      { score: 25, label: 'Tidak Terpenuhi', description: 'Pelaksanaan sangat berbeda dari Rancangan Kerja yang disahkan MPM PNJ.' },
      { score: 50, label: 'Kurang', description: 'Sebagian kecil sesuai Raker; banyak deviasi tanpa pelaporan kepada MPM.' },
      { score: 75, label: 'Cukup', description: 'Sebagian besar sesuai Raker; deviasi minor telah dilaporkan ke MPM PNJ.' },
      { score: 100, label: 'Baik', description: 'Seluruh pelaksanaan sesuai Rancangan Kerja yang disahkan dalam Sidang Raker.' },
    ],
  },
  {
    code: 'A5',
    name: 'Ketepatan Waktu Pengajuan Proposal/KAK',
    weight: 8,
    legalBasis: 'TAP 008/TAP/MPM PNJ/VII/2025 Pasal 13 ayat (4a) dan (4b); Pasal 15 ayat (1); Pasal 16 ayat (1)',
    description:
      'Proposal atau Kerangka Acuan Kerja (KAK) wajib diajukan kepada MPM PNJ selambat-lambatnya 2 minggu sebelum Proker Kecil dan 1 bulan sebelum Proker Besar terlaksana.',
    scoreDescriptions: [
      { score: 25, label: 'Tidak Terpenuhi', description: 'Tidak ada Proposal/KAK yang diajukan sama sekali.' },
      { score: 50, label: 'Kurang', description: 'Proposal/KAK ada namun diajukan kurang dari setengah batas waktu minimum.' },
      { score: 75, label: 'Cukup', description: 'Proposal/KAK diajukan mendekati batas waktu minimum (kurang dari 2 minggu/1 bulan).' },
      { score: 100, label: 'Baik', description: 'Proposal/KAK diajukan tepat waktu (minimal 2 minggu/1 bulan) sebelum kegiatan.' },
    ],
  },
  {
    code: 'A6',
    name: 'Kesesuaian Pelaksanaan dengan Proposal/KAK yang Disahkan',
    weight: 8,
    legalBasis: 'TAP 008/TAP/MPM PNJ/VII/2025 Pasal 36 ayat (3) huruf h; Panduan Kemahasiswaan Bab III No. 3.2.1.4',
    description:
      'Pelaksanaan Program Kerja harus sesuai dengan Proposal atau KAK yang telah diajukan dan disahkan MPM PNJ, meliputi latar belakang, nama/tema, tujuan, sasaran, waktu, tempat, kepanitiaan, jadwal, anggaran, dan pengesahan.',
    scoreDescriptions: [
      { score: 25, label: 'Tidak Terpenuhi', description: 'Pelaksanaan menyimpang jauh dari dokumen Proposal/KAK yang disahkan.' },
      { score: 50, label: 'Kurang', description: 'Sebagian kecil sesuai; banyak komponen kegiatan berbeda dari Proposal/KAK.' },
      { score: 75, label: 'Cukup', description: 'Sebagian besar pelaksanaan sesuai dokumen; perubahan telah dikomunikasikan.' },
      { score: 100, label: 'Baik', description: 'Seluruh pelaksanaan sepenuhnya sesuai dengan Proposal/KAK yang disahkan MPM.' },
    ],
  },
  {
    code: 'A7',
    name: 'Ketepatan Waktu Pelaksanaan',
    weight: 10,
    legalBasis: 'TAP 008/TAP/MPM PNJ/VII/2025 Pasal 36 ayat (6) huruf b',
    description:
      'Waktu pelaksanaan Program Kerja harus sesuai Rancangan Kerja dengan toleransi keterlambatan maksimal 7 hari dari rencana awal. HMJ wajib berkoordinasi dengan MPM PNJ sebelum keterlambatan terjadi.',
    scoreDescriptions: [
      { score: 25, label: 'Tidak Terpenuhi', description: 'Keterlambatan lebih dari 7 hari tanpa koordinasi sama sekali dengan MPM PNJ.' },
      { score: 50, label: 'Kurang', description: 'Keterlambatan lebih dari 7 hari; koordinasi dilakukan namun setelah fakta.' },
      { score: 75, label: 'Cukup', description: 'Keterlambatan maksimal 7 hari; koordinasi dilakukan terlebih dahulu dengan MPM.' },
      { score: 100, label: 'Baik', description: 'Pelaksanaan tepat waktu sesuai Rancangan Kerja; tidak ada keterlambatan.' },
    ],
  },
  {
    code: 'A8',
    name: 'Capaian Target dan Parameter Keberhasilan Kegiatan',
    weight: 10,
    legalBasis: 'TAP 008/TAP/MPM PNJ/VII/2025 Pasal 13 ayat (2); Pasal 36 ayat (1), ayat (6) huruf a',
    description:
      'Keberhasilan Program Kerja diukur berdasarkan parameter keberhasilan dan target yang tercantum dalam Rancangan Kerja dan Proposal/KAK, mencakup target kuantitatif maupun kualitatif.',
    scoreDescriptions: [
      { score: 25, label: 'Tidak Terpenuhi', description: 'Target tidak tercapai; parameter keberhasilan yang ditetapkan tidak terpenuhi.' },
      { score: 50, label: 'Kurang', description: 'Target tercapai kurang dari 50%; efektivitas kegiatan sangat rendah.' },
      { score: 75, label: 'Cukup', description: 'Target tercapai 50–79%; efektivitas dan efisiensi kegiatan cukup baik.' },
      { score: 100, label: 'Baik', description: 'Seluruh target (80% ke atas) dan parameter keberhasilan tercapai sesuai Raker/Proposal.' },
    ],
  },
  {
    code: 'A9',
    name: 'Intensitas dan Kualitas Rapat Pleno OC bersama SC',
    weight: 7,
    legalBasis: 'TAP 008/TAP/MPM PNJ/VII/2025 Pasal 8 ayat (3) huruf c; Pasal 10; Pasal 36 ayat (6) huruf c angka 2',
    description:
      'Organizing Committee (OC) wajib mengadakan rapat pleno internal bersama Steering Committee (SC/MPM Distrik) di seluruh tahapan kegiatan (pra, pelaksanaan, dan pasca-kegiatan).',
    scoreDescriptions: [
      { score: 25, label: 'Tidak Terpenuhi', description: 'Tidak ada rapat pleno OC bersama SC dalam satu pun tahapan program kerja.' },
      { score: 50, label: 'Kurang', description: 'Rapat pleno hanya dilakukan pada satu tahapan; tahapan lain tidak ada rapat.' },
      { score: 75, label: 'Cukup', description: 'Rapat pleno dilakukan di sebagian besar tahapan; ada tahapan yang terlewat.' },
      { score: 100, label: 'Baik', description: 'Rapat pleno OC bersama SC dilakukan secara aktif di seluruh tahapan kegiatan.' },
    ],
  },
  {
    code: 'A10',
    name: 'Koordinasi Project Officer dengan Steering Committee MPM Distrik',
    weight: 5,
    legalBasis: 'TAP 008/TAP/MPM PNJ/VII/2025 Pasal 8 ayat (3) huruf c; Pasal 36 ayat (6) huruf c angka 2; Pasal 36 ayat (8)',
    description:
      'Project Officer (PO) HMJ wajib berkoordinasi secara aktif dengan Steering Committee pada MPM Distrik (Komisi III) di seluruh tahapan kegiatan, tidak terbatas pada forum rapat pleno.',
    scoreDescriptions: [
      { score: 25, label: 'Tidak Terpenuhi', description: 'Tidak ada koordinasi antara PO dan SC/MPM Distrik dalam satu pun tahapan.' },
      { score: 50, label: 'Kurang', description: 'Koordinasi hanya pada satu tahapan; keputusan penting banyak diambil tanpa SC.' },
      { score: 75, label: 'Cukup', description: 'Koordinasi di sebagian besar tahapan; ada keputusan penting yang diambil tanpa SC.' },
      { score: 100, label: 'Baik', description: 'PO berkoordinasi aktif dengan SC MPM Distrik di seluruh tahapan kegiatan.' },
    ],
  },
  {
    code: 'A11',
    name: 'Pelaporan Progres kepada MPM PNJ',
    weight: 5,
    legalBasis: 'TAP 008/TAP/MPM PNJ/VII/2025 Pasal 26 ayat (4); Pasal 30',
    description:
      'HMJ wajib memberikan laporan secara lisan dan tertulis kepada MPM PNJ atas pelaksanaan program kerja secara berkala dan/atau bila diminta, mencakup perkembangan, hambatan, dan tindak lanjut.',
    scoreDescriptions: [
      { score: 25, label: 'Tidak Terpenuhi', description: 'Tidak ada pelaporan progres kepada MPM PNJ dalam bentuk apa pun.' },
      { score: 50, label: 'Kurang', description: 'Pelaporan hanya dilakukan saat diminta MPM; tidak ada inisiatif pelaporan proaktif.' },
      { score: 75, label: 'Cukup', description: 'Pelaporan dilakukan secara berkala; sebagian besar ketentuan pelaporan terpenuhi.' },
      { score: 100, label: 'Baik', description: 'Pelaporan dilakukan proaktif dan responsif saat diminta; seluruh ketentuan terpenuhi.' },
    ],
  },
  {
    code: 'A12',
    name: 'Akuntabilitas Keuangan Kegiatan',
    weight: 5,
    legalBasis: 'TAP 008/TAP/MPM PNJ/VII/2025 Pasal 34; GBHK HMJ (TAP 002/TAP/MPM PNJ/II/2026) Bab IV ayat 1 dan 3',
    description:
      'Pengelolaan keuangan wajib berlandaskan prinsip transparansi, keadilan, dan akuntabilitas. Setiap transaksi wajib dibukukan secara tertib dan disertai bukti yang sah dari sumber yang diizinkan.',
    scoreDescriptions: [
      { score: 25, label: 'Tidak Terpenuhi', description: 'Tidak ada laporan keuangan; tidak ada bukti transaksi yang sah.' },
      { score: 50, label: 'Kurang', description: 'Laporan ada namun tidak transparan; sebagian transaksi tidak disertai bukti sah.' },
      { score: 75, label: 'Cukup', description: 'Laporan keuangan disusun; sebagian besar transaksi disertai bukti yang sah.' },
      { score: 100, label: 'Baik', description: 'Laporan keuangan lengkap dan terbuka; seluruh transaksi terdokumentasi dengan bukti sah.' },
    ],
  },
  {
    code: 'A13',
    name: 'Kelengkapan dan Ketepatan Waktu LPJ Kepanitiaan',
    weight: 8,
    legalBasis: 'TAP 008/TAP/MPM PNJ/VII/2025 Pasal 15 ayat (2); Pasal 16 ayat (2); Pasal 37 ayat (3); Pasal 38 ayat (2); Panduan Kemahasiswaan Bab III No. 3.4.1 and 3.4.2',
    description:
      'LPJ kepanitiaan wajib diserahkan maksimal 1 minggu setelah kegiatan. LPJ dinilai berdasarkan 10 aspek sesuai Pasal 37 ayat (3) untuk menentukan kelayakan.',
    scoreDescriptions: [
      { score: 25, label: 'Tidak Terpenuhi', description: 'LPJ tidak diserahkan atau diserahkan lebih dari 2 minggu setelah kegiatan.' },
      { score: 50, label: 'Kurang', description: 'LPJ diserahkan lebih dari 1 minggu setelah kegiatan; isi tidak lengkap.' },
      { score: 75, label: 'Cukup', description: 'LPJ diserahkan maksimal 1 minggu; sebagian aspek penilaian terpenuhi.' },
      { score: 100, label: 'Baik', description: 'LPJ diserahkan tepat waktu (maks. 1 minggu) setelah kegiatan; seluruh 10 aspek terpenuhi.' },
    ],
  },
  {
    code: 'A14',
    name: 'Ketertiban Administrasi dan Kesekretariatan',
    weight: 4,
    legalBasis: 'AD/ART IKM PNJ; Pedoman Kesekretariatan Ormawa IKM PNJ (Pedkes); Panduan Kemahasiswaan Bab III No. 3.2.1.2',
    description:
      'Seluruh dokumen formal Program Kerja wajib mengikuti Pedoman Kesekretariatan IKM PNJ (Pedkes), mencakup format kop surat, nomor surat, tanda tangan, dan stempel basah.',
    scoreDescriptions: [
      { score: 25, label: 'Tidak Terpenuhi', description: 'Dokumen formal tidak mengikuti format Pedkes sama sekali.' },
      { score: 50, label: 'Kurang', description: 'Sebagian kecil dokumen sesuai Pedkes; banyak ketidaksesuaian format.' },
      { score: 75, label: 'Cukup', description: 'Sebagian besar dokumen sesuai Pedkes; terdapat kesalahan minor pada format.' },
      { score: 100, label: 'Baik', description: 'Seluruh dokumen formal mengikuti Pedoman Kesekretariatan IKM PNJ dengan benar.' },
    ],
  },
];

// ===== SET B — PARAMETER AGENDA (9 parameters, total 100%) =====

export const AGENDA_PARAMETERS: Parameter[] = [
  {
    code: 'B1',
    name: 'Kesesuaian dengan AD/ART IKM PNJ dan Ketetapan MPM PNJ',
    weight: 12,
    legalBasis: 'TAP 008/TAP/MPM PNJ/VII/2025 Pasal 36 ayat (3) huruf a dan b; AD/ART IKM PNJ',
    description:
      'Setiap Agenda yang dilaksanakan pengurus HMJ wajib tidak bertentangan dengan AD/ART IKM PNJ serta seluruh ketetapan MPM PNJ. Norma dasar organisasi tetap mengikat penuh.',
    scoreDescriptions: [
      { score: 25, label: 'Tidak Terpenuhi', description: 'Kegiatan secara nyata bertentangan dengan AD/ART atau ketetapan MPM PNJ.' },
      { score: 50, label: 'Kurang', description: 'Sebagian kecil sesuai; terdapat pelanggaran signifikan terhadap norma dasar organisasi.' },
      { score: 75, label: 'Cukup', description: 'Sebagian besar sesuai; terdapat ketidaksesuaian minor yang tidak bersifat prinsipil.' },
      { score: 100, label: 'Baik', description: 'Sepenuhnya sesuai dengan AD/ART dan seluruh ketetapan MPM PNJ yang berlaku.' },
    ],
  },
  {
    code: 'B2',
    name: 'Kesesuaian dengan Garis-Garis Besar Haluan Kerja HMJ',
    weight: 12,
    legalBasis: 'TAP 002/TAP/MPM PNJ/II/2026 GBHK HMJ Bab I-B, Bab II-B, Bab III-C; TAP 008/2025 Pasal 36 ayat (3) huruf e',
    description:
      'Agenda wajib mencerminkan asas dan aspek GBHK HMJ yang disusun MPM PNJ. Seluruh Agenda harus dapat dikaitkan dengan minimal satu dari 16 asas dan 12 aspek GBHK.',
    scoreDescriptions: [
      { score: 25, label: 'Tidak Terpenuhi', description: 'Tidak mencerminkan satu pun asas atau aspek GBHK HMJ yang berlaku.' },
      { score: 50, label: 'Kurang', description: 'Mencerminkan sebagian kecil asas/aspek GBHK; arah kebijakan belum selaras.' },
      { score: 75, label: 'Cukup', description: 'Mencerminkan sebagian besar asas/aspek GBHK; keselarasan cukup baik.' },
      { score: 100, label: 'Baik', description: 'Seluruh pelaksanaan selaras penuh dengan GBHK HMJ yang disusun MPM.' },
    ],
  },
  {
    code: 'B3',
    name: 'Kesesuaian dengan Mekanisme Pengawasan Kelembagaan MPM PNJ',
    weight: 8,
    legalBasis: 'TAP 008/TAP/MPM PNJ/VII/2025 Pasal 26 ayat (1) dan (2); Pasal 36 ayat (3) huruf c',
    description:
      'Pelaksanaan Agenda wajib berjalan sesuai mekanisme pengawasan yang ditetapkan MPM PNJ, mencakup prosedur koordinasi dan pelaporan yang berlaku kepada MPM PNJ.',
    scoreDescriptions: [
      { score: 25, label: 'Tidak Terpenuhi', description: 'Tidak mengikuti mekanisme pengawasan MPM sama sekali.' },
      { score: 50, label: 'Kurang', description: 'Mengikuti sebagian kecil mekanisme; prosedur koordinasi banyak dilewati.' },
      { score: 75, label: 'Cukup', description: 'Mengikuti sebagian besar mekanisme; penyimpangan minor telah dikomunikasikan.' },
      { score: 100, label: 'Baik', description: 'Seluruh Agenda berjalan sesuai mekanisme pengawasan kelembagaan MPM PNJ.' },
    ],
  },
  {
    code: 'B4',
    name: 'Kesesuaian dengan Rancangan Kerja yang Disahkan',
    weight: 20,
    legalBasis: 'TAP 008/TAP/MPM PNJ/VII/2025 Pasal 13 ayat (2); Pasal 27 ayat (3) dan (4); Pasal 36 ayat (3) huruf g dan ayat (6) huruf a',
    description:
      'Pelaksanaan Agenda dibandingkan dengan susunan yang telah disahkan dalam Sidang Rapat Kerja. Rancangan Kerja adalah satu-satunya dokumen perencanaan formal untuk Agenda.',
    scoreDescriptions: [
      { score: 25, label: 'Tidak Terpenuhi', description: 'Pelaksanaan sangat berbeda dari Rancangan Kerja yang disahkan MPM PNJ.' },
      { score: 50, label: 'Kurang', description: 'Sebagian kecil Agenda sesuai Raker; banyak deviasi tanpa pelaporan ke MPM.' },
      { score: 75, label: 'Cukup', description: 'Sebagian besar Agenda sesuai Raker; deviasi minor telah dilaporkan ke MPM.' },
      { score: 100, label: 'Baik', description: 'Seluruh pelaksanaan Agenda sesuai Rancangan Kerja yang disahkan dalam Sidang Raker.' },
    ],
  },
  {
    code: 'B5',
    name: 'Ketepatan Waktu Pelaksanaan',
    weight: 15,
    legalBasis: 'TAP 008/TAP/MPM PNJ/VII/2025 Pasal 36 ayat (6) huruf b',
    description:
      'Waktu pelaksanaan Agenda harus sesuai Rancangan Kerja dengan toleransi keterlambatan maksimal 7 hari. HMJ wajib berkoordinasi dengan MPM PNJ sebelum keterlambatan terjadi.',
    scoreDescriptions: [
      { score: 25, label: 'Tidak Terpenuhi', description: 'Keterlambatan lebih dari 7 hari tanpa koordinasi dengan MPM PNJ.' },
      { score: 50, label: 'Kurang', description: 'Keterlambatan lebih dari 7 hari; koordinasi dilakukan namun setelah fakta.' },
      { score: 75, label: 'Cukup', description: 'Keterlambatan maksimal 7 hari; koordinasi dilakukan terlebih dahulu dengan MPM.' },
      { score: 100, label: 'Baik', description: 'Agenda terlaksana tepat waktu sesuai Rancangan Kerja; tidak ada keterlambatan.' },
    ],
  },
  {
    code: 'B6',
    name: 'Capaian Target dan Parameter Keberhasilan Agenda',
    weight: 15,
    legalBasis: 'TAP 008/TAP/MPM PNJ/VII/2025 Pasal 13 ayat (2); Pasal 36 ayat (1) dan ayat (6) huruf a',
    description:
      'Keberhasilan Agenda diukur berdasarkan target dan parameter keberhasilan yang tercantum dalam Rancangan Kerja. Target Agenda umumnya bersifat internal pengurus.',
    scoreDescriptions: [
      { score: 25, label: 'Tidak Terpenuhi', description: 'Target tidak tercapai; parameter keberhasilan Agenda tidak terpenuhi.' },
      { score: 50, label: 'Kurang', description: 'Target tercapai kurang dari 50%; efektivitas Agenda sangat rendah.' },
      { score: 75, label: 'Cukup', description: 'Target tercapai 50–79%; efektivitas Agenda cukup baik.' },
      { score: 100, label: 'Baik', description: 'Seluruh target (80% ke atas) dan parameter keberhasilan Agenda tercapai sesuai Raker.' },
    ],
  },
  {
    code: 'B7',
    name: 'Pelaporan Progres kepada MPM PNJ',
    weight: 8,
    legalBasis: 'TAP 008/TAP/MPM PNJ/VII/2025 Pasal 26 ayat (4); Pasal 30',
    description:
      'HMJ wajib memberikan laporan secara lisan dan tertulis kepada MPM PNJ atas pelaksanaan agenda secara berkala dan/atau bila diminta.',
    scoreDescriptions: [
      { score: 25, label: 'Tidak Terpenuhi', description: 'Tidak ada pelaporan progres Agenda kepada MPM PNJ dalam bentuk apa pun.' },
      { score: 50, label: 'Kurang', description: 'Pelaporan hanya dilakukan saat diminta MPM; tidak ada inisiatif proaktif.' },
      { score: 75, label: 'Cukup', description: 'Pelaporan cukup berkala; sebagian besar permintaan MPM direspons dengan baik.' },
      { score: 100, label: 'Baik', description: 'Pelaporan dilakukan proaktif and responsif; seluruh ketentuan pelaporan terpenuhi.' },
    ],
  },
  {
    code: 'B8',
    name: 'Akuntabilitas Keuangan Agenda',
    weight: 5,
    legalBasis: 'TAP 008/TAP/MPM PNJ/VII/2025 Pasal 34; GBHK HMJ (TAP 002/TAP/MPM PNJ/II/2026) Bab IV ayat 1 dan 3',
    description:
      'Pengelolaan keuangan Agenda wajib berlandaskan prinsip transparansi, keadilan, dan akuntabilitas. Jika tidak ada transaksi keuangan, dinilai berdasarkan ketertiban pencatatan nihil.',
    scoreDescriptions: [
      { score: 25, label: 'Tidak Terpenuhi', description: 'Ada transaksi keuangan namun tidak ada laporan atau bukti sah sama sekali.' },
      { score: 50, label: 'Kurang', description: 'Laporan ada namun tidak transparan; sebagian transaksi tanpa bukti yang sah.' },
      { score: 75, label: 'Cukup', description: 'Laporan keuangan disusun; sebagian besar transaksi disertai bukti yang sah.' },
      { score: 100, label: 'Baik', description: 'Laporan keuangan lengkap atau tercatat nihil; seluruh transaksi terdokumentasi.' },
    ],
  },
  {
    code: 'B9',
    name: 'Ketertiban Administrasi dan Kesekretariatan',
    weight: 5,
    legalBasis: 'AD/ART IKM PNJ; Pedoman Kesekretariatan Ormawa IKM PNJ (Pedkes); TAP 009/TAP/MPM PNJ/VII/2025 Pasal 11 ayat (3)',
    description:
      'Dokumen formal Agenda wajib mengikuti Pedoman Kesekretariatan IKM PNJ. Publikasi internal media cetak wajib dilegalisasi HMJ di bawah pengawasan MPM Perwakilan Jurusan.',
    scoreDescriptions: [
      { score: 25, label: 'Tidak Terpenuhi', description: 'Dokumen dari Agenda tidak mengikuti format Pedkes sama sekali.' },
      { score: 50, label: 'Kurang', description: 'Sebagian kecil dokumen sesuai Pedkes; banyak ketidaksesuaian format.' },
      { score: 75, label: 'Cukup', description: 'Sebagian besar dokumen sesuai Pedkes; terdapat kesalahan minor pada format.' },
      { score: 100, label: 'Baik', description: 'Seluruh dokumen dari Agenda mengikuti Pedoman Kesekretariatan IKM PNJ.' },
    ],
  },
];
