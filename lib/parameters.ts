import { Parameter } from './types';

// ===== SET A — PARAMETER PROGRAM KERJA (14 parameters, total 100%) =====

export const PROKER_PARAMETERS: Parameter[] = [
  {
    code: 'A1',
    name: 'Kesesuaian AD/ART',
    weight: 8,
    legalBasis: 'TAP 008 Pasal 36 ayat (3) huruf a dan b; AD/ART IKM PNJ',
    description:
      'Setiap Program Kerja wajib tidak bertentangan dengan AD/ART IKM PNJ serta seluruh ketetapan MPM PNJ yang berlaku, mencakup tujuan, mekanisme, peserta, maupun output.',
    scoreDescriptions: [
      { score: 25, label: 'Kurang', description: 'Terdapat pelanggaran signifikan terhadap AD/ART atau ketetapan MPM PNJ; upaya penyesuaian sangat minim.' },
      { score: 50, label: 'Cukup', description: 'Sebagian besar sesuai; terdapat ketidaksesuaian minor yang tidak bersifat prinsipil.' },
      { score: 75, label: 'Baik', description: 'Hampir sepenuhnya sesuai; ketidaksesuaian sangat minor dan telah dikomunikasikan.' },
      { score: 100, label: 'Sangat Baik', description: 'Sepenuhnya sesuai dengan AD/ART dan seluruh ketetapan MPM PNJ yang berlaku.' },
    ],
  },
  {
    code: 'A2',
    name: 'Kesesuaian GBHK',
    weight: 7,
    legalBasis: 'TAP 002/TAP/MPM PNJ/II/2026 GBHK HMJ; TAP 008/2025 Pasal 36 ayat (3) huruf e',
    description:
      'Program Kerja wajib selaras dengan GBHK HMJ, mencakup seluruh 16 asas dan 12 aspek. Setiap kegiatan harus dapat dikaitkan dengan minimal satu asas atau aspek GBHK.',
    scoreDescriptions: [
      { score: 25, label: 'Kurang', description: 'Mencerminkan sangat sedikit asas/aspek GBHK; arah kebijakan jauh dari selaras.' },
      { score: 50, label: 'Cukup', description: 'Mencerminkan sebagian besar asas/aspek GBHK; keselarasan cukup baik.' },
      { score: 75, label: 'Baik', description: 'Hampir seluruh pelaksanaan selaras dengan GBHK HMJ; penyimpangan sangat minor.' },
      { score: 100, label: 'Sangat Baik', description: 'Seluruh pelaksanaan selaras penuh dengan GBHK HMJ yang disusun MPM.' },
    ],
  },
  {
    code: 'A3',
    name: 'Kesesuaian Mekanisme Pengawasan MPM',
    weight: 5,
    legalBasis: 'TAP 008 Pasal 26 ayat (1) dan (2); Pasal 36 ayat (3) huruf c',
    description:
      'Pelaksanaan wajib berjalan sesuai mekanisme pengawasan MPM PNJ, mencakup kepatuhan terhadap prosedur pelaporan, perizinan, dan koordinasi dengan SC.',
    scoreDescriptions: [
      { score: 25, label: 'Kurang', description: 'Mengikuti sangat sedikit mekanisme; prosedur banyak dilewati tanpa komunikasi ke MPM.' },
      { score: 50, label: 'Cukup', description: 'Mengikuti sebagian besar mekanisme; penyimpangan minor telah dikomunikasikan.' },
      { score: 75, label: 'Baik', description: 'Hampir seluruh mekanisme diikuti; komunikasi ke MPM dilakukan dengan baik.' },
      { score: 100, label: 'Sangat Baik', description: 'Seluruh kegiatan berjalan sesuai mekanisme pengawasan kelembagaan MPM PNJ.' },
    ],
  },
  {
    code: 'A4',
    name: 'Kesesuaian Rancangan Kerja',
    weight: 15,
    legalBasis: 'TAP 008 Pasal 13 ayat (2); Pasal 27 ayat (3) dan (4); Pasal 36 ayat (3) huruf g dan ayat (6) huruf a',
    description:
      'Pelaksanaan riil dibandingkan dengan susunan yang disahkan dalam Sidang Rapat Kerja. Perubahan wajib dilaporkan melalui Rapat Kerja Insidental.',
    scoreDescriptions: [
      { score: 25, label: 'Kurang', description: 'Banyak deviasi dari Rancangan Kerja; sebagian besar tidak dilaporkan kepada MPM.' },
      { score: 50, label: 'Cukup', description: 'Sebagian besar sesuai Raker; deviasi minor telah dilaporkan ke MPM PNJ.' },
      { score: 75, label: 'Baik', description: 'Hampir seluruhnya sesuai Raker; deviasi kecil dilaporkan dengan baik.' },
      { score: 100, label: 'Sangat Baik', description: 'Seluruh pelaksanaan sesuai Rancangan Kerja yang disahkan dalam Sidang Raker.' },
    ],
  },
  {
    code: 'A5',
    name: 'Ketepatan Waktu Pengajuan Proposal/KAK',
    weight: 8,
    legalBasis: 'TAP 008 Pasal 13 ayat (4a) dan (4b); Pasal 15 ayat (1); Pasal 16 ayat (1)',
    description:
      'Proposal atau KAK wajib diajukan kepada MPM PNJ selambat-lambatnya: Proker Kecil 2 minggu, Proker Besar 1 bulan sebelum pelaksanaan.',
    scoreDescriptions: [
      { score: 25, label: 'Kurang', description: 'Proposal/KAK ada namun diajukan sangat terlambat (kurang dari setengah batas waktu minimum).' },
      { score: 50, label: 'Cukup', description: 'Proposal/KAK diajukan mendekati batas waktu minimum (kurang dari 2 minggu/1 bulan).' },
      { score: 75, label: 'Baik', description: 'Proposal/KAK diajukan hampir tepat waktu; keterlambatan sangat minor.' },
      { score: 100, label: 'Sangat Baik', description: 'Proposal/KAK diajukan tepat waktu (min. 2 minggu/1 bulan) sebelum kegiatan.' },
    ],
  },
  {
    code: 'A6',
    name: 'Kesesuaian Pelaksanaan dengan Proposal/KAK',
    weight: 8,
    legalBasis: 'TAP 008 Pasal 36 ayat (3) huruf h',
    description:
      'Pelaksanaan harus sesuai dengan Proposal/KAK yang telah disahkan MPM PNJ, meliputi seluruh komponen proposal.',
    scoreDescriptions: [
      { score: 25, label: 'Kurang', description: 'Banyak komponen kegiatan berbeda dari Proposal/KAK; perubahan tidak dikomunikasikan.' },
      { score: 50, label: 'Cukup', description: 'Sebagian besar pelaksanaan sesuai dokumen; perubahan telah dikomunikasikan ke MPM.' },
      { score: 75, label: 'Baik', description: 'Hampir seluruhnya sesuai Proposal/KAK; penyimpangan sangat minor dan dilaporkan.' },
      { score: 100, label: 'Sangat Baik', description: 'Seluruh pelaksanaan sepenuhnya sesuai dengan Proposal/KAK yang disahkan MPM.' },
    ],
  },
  {
    code: 'A7',
    name: 'Ketepatan Waktu Pelaksanaan',
    weight: 10,
    legalBasis: 'TAP 008 Pasal 36 ayat (6) huruf b',
    description:
      'Waktu pelaksanaan harus sesuai Rancangan Kerja dengan toleransi keterlambatan maksimal 7 hari. HMJ wajib berkoordinasi dengan MPM sebelum keterlambatan terjadi.',
    scoreDescriptions: [
      { score: 25, label: 'Kurang', description: 'Keterlambatan lebih dari 7 hari; koordinasi dilakukan namun setelah fakta terjadi.' },
      { score: 50, label: 'Cukup', description: 'Keterlambatan maksimal 7 hari; koordinasi dilakukan terlebih dahulu dengan MPM.' },
      { score: 75, label: 'Baik', description: 'Keterlambatan sangat kecil (1–2 hari); koordinasi proaktif dengan MPM.' },
      { score: 100, label: 'Sangat Baik', description: 'Pelaksanaan tepat waktu sesuai Rancangan Kerja; tidak ada keterlambatan.' },
    ],
  },
  {
    code: 'A8',
    name: 'Capaian Target dan Parameter Keberhasilan',
    weight: 10,
    legalBasis: 'TAP 008 Pasal 13 ayat (2); Pasal 36 ayat (1), ayat (6) huruf a',
    description:
      'Keberhasilan diukur berdasarkan parameter dan target dalam Rancangan Kerja dan Proposal/KAK, mencakup target kuantitatif dan kualitatif.',
    scoreDescriptions: [
      { score: 25, label: 'Kurang', description: 'Target tercapai kurang dari 50%; efektivitas kegiatan sangat rendah.' },
      { score: 50, label: 'Cukup', description: 'Target tercapai 50–79%; efektivitas dan efisiensi kegiatan cukup baik.' },
      { score: 75, label: 'Baik', description: 'Target tercapai 80–94%; hampir seluruh parameter keberhasilan terpenuhi.' },
      { score: 100, label: 'Sangat Baik', description: 'Seluruh target (95% ke atas) dan parameter keberhasilan tercapai sesuai Raker/Proposal.' },
    ],
  },
  {
    code: 'A9',
    name: 'Intensitas dan Kualitas Rapat Pleno OC-SC',
    weight: 7,
    legalBasis: 'TAP 008 Pasal 8 ayat (3) huruf c; Pasal 10; Pasal 36 ayat (6) huruf c angka 2',
    description:
      'OC wajib mengadakan rapat pleno internal bersama SC/MPM PNJ selama tahapan berlangsung. Rapat pleno mencakup tahap pra-kegiatan, pelaksanaan, dan pasca-kegiatan.',
    scoreDescriptions: [
      { score: 25, label: 'Kurang', description: 'Rapat pleno hanya dilakukan pada satu tahapan; tahapan lain tidak ada rapat sama sekali.' },
      { score: 50, label: 'Cukup', description: 'Rapat pleno dilakukan di sebagian besar tahapan; ada tahapan yang terlewat.' },
      { score: 75, label: 'Baik', description: 'Rapat pleno dilakukan di hampir seluruh tahapan; kualitas pembahasan cukup baik.' },
      { score: 100, label: 'Sangat Baik', description: 'Rapat pleno OC bersama SC dilakukan aktif di seluruh tahapan kegiatan.' },
    ],
  },
  {
    code: 'A10',
    name: 'Koordinasi PO dengan SC MPM PNJ',
    weight: 5,
    legalBasis: 'TAP 008 Pasal 8 ayat (3) huruf c; Pasal 36 ayat (6) huruf c angka 2; Pasal 36 ayat (8)',
    description:
      'PO HMJ wajib berkoordinasi secara aktif dengan Steering Committee MPM PNJ di seluruh tahapan.',
    scoreDescriptions: [
      { score: 25, label: 'Kurang', description: 'Koordinasi hanya pada satu tahapan; keputusan penting banyak diambil tanpa SC.' },
      { score: 50, label: 'Cukup', description: 'Koordinasi di sebagian besar tahapan; ada keputusan penting yang diambil tanpa SC.' },
      { score: 75, label: 'Baik', description: 'Koordinasi di hampir seluruh tahapan; SC dilibatkan dalam hampir semua keputusan.' },
      { score: 100, label: 'Sangat Baik', description: 'PO berkoordinasi aktif dengan SC MPM PNJ di seluruh tahapan kegiatan.' },
    ],
  },
  {
    code: 'A11',
    name: 'Pelaporan Progres kepada MPM PNJ',
    weight: 5,
    legalBasis: 'ART IKM PNJ Pasal 34 ayat (3); TAP 008 Pasal 26 ayat (4); Pasal 30',
    description:
      'HMJ wajib memberikan laporan lisan dan tertulis kepada MPM PNJ secara berkala dan/atau bila diminta.',
    scoreDescriptions: [
      { score: 25, label: 'Kurang', description: 'Pelaporan hanya dilakukan saat diminta MPM; tidak ada inisiatif pelaporan proaktif.' },
      { score: 50, label: 'Cukup', description: 'Pelaporan dilakukan secara berkala; sebagian besar ketentuan pelaporan terpenuhi.' },
      { score: 75, label: 'Baik', description: 'Pelaporan proaktif and responsif; hampir seluruh ketentuan pelaporan terpenuhi.' },
      { score: 100, label: 'Sangat Baik', description: 'Pelaporan dilakukan proaktif dan responsif di seluruh tahapan; semua ketentuan terpenuhi.' },
    ],
  },
  {
    code: 'A12',
    name: 'Akuntabilitas Keuangan',
    weight: 5,
    legalBasis: 'AD IKM PNJ Pasal 17 ayat (1)–(4); Pasal 18 ayat (2) dan (4); ART IKM PNJ Pasal 50 ayat (1); Pasal 53',
    description:
      'Pengelolaan keuangan wajib berlandaskan prinsip transparansi, keadilan, dan akuntabilitas. Setiap transaksi wajib dibukukan dan disertai bukti yang sah.',
    scoreDescriptions: [
      { score: 25, label: 'Kurang', description: 'Laporan ada namun tidak transparan; sebagian transaksi tidak disertai bukti sah.' },
      { score: 50, label: 'Cukup', description: 'Laporan keuangan disusun; sebagian besar transaksi disertai bukti yang sah.' },
      { score: 75, label: 'Baik', description: 'Laporan keuangan hampir lengkap; hampir seluruh transaksi terdokumentasi dengan baik.' },
      { score: 100, label: 'Sangat Baik', description: 'Laporan keuangan lengkap dan terbuka; seluruh transaksi terdokumentasi dengan bukti sah.' },
    ],
  },
  {
    code: 'A13',
    name: 'Kelengkapan dan Ketepatan Waktu LPJ',
    weight: 8,
    legalBasis: 'TAP 008 Pasal 31 ayat (3); Pasal 32; Pasal 37 ayat (3); Pasal 38 ayat (2)',
    description:
      'LPJ kepanitiaan wajib diserahkan maksimal 1 minggu setelah kegiatan dan menjadi syarat pengajuan Program Kerja berikutnya.',
    scoreDescriptions: [
      { score: 25, label: 'Kurang', description: 'LPJ diserahkan lebih dari 1 minggu setelah kegiatan; isi tidak lengkap.' },
      { score: 50, label: 'Cukup', description: 'LPJ diserahkan maksimal 1 minggu; sebagian aspek penilaian terpenuhi.' },
      { score: 75, label: 'Baik', description: 'LPJ tepat waktu; sebagian besar dari 8 aspek penilaian terpenuhi dengan baik.' },
      { score: 100, label: 'Sangat Baik', description: 'LPJ diserahkan tepat waktu (maks. 1 minggu); seluruh 8 aspek penilaian terpenuhi.' },
    ],
  },
  {
    code: 'A14',
    name: 'Ketertiban Administrasi dan Kesekretariatan',
    weight: 4,
    legalBasis: 'AD/ART IKM PNJ; Pedkes; Panduan Kemahasiswaan Bab II No.2.5(8)',
    description:
      'Seluruh dokumen formal wajib mengikuti Pedoman Kesekretariatan IKM PNJ (Pedkes), termasuk format kop surat, nomor surat, dan pengesahan.',
    scoreDescriptions: [
      { score: 25, label: 'Kurang', description: 'Sebagian kecil dokumen sesuai Pedkes; banyak ketidaksesuaian format yang signifikan.' },
      { score: 50, label: 'Cukup', description: 'Sebagian besar dokumen sesuai Pedkes; terdapat kesalahan minor pada format.' },
      { score: 75, label: 'Baik', description: 'Hampir seluruh dokumen sesuai Pedkes; kesalahan sangat minor dan tidak prinsipil.' },
      { score: 100, label: 'Sangat Baik', description: 'Seluruh dokumen formal mengikuti Pedoman Kesekretariatan IKM PNJ dengan benar.' },
    ],
  },
];

// ===== SET B — PARAMETER AGENDA (9 parameters, total 100%) =====

export const AGENDA_PARAMETERS: Parameter[] = [
  {
    code: 'B1',
    name: 'Kesesuaian AD/ART',
    weight: 12,
    legalBasis: 'TAP 008 Pasal 36 ayat (3) huruf a dan b; AD/ART IKM PNJ; ART Pasal 34 ayat (1)',
    description:
      'Setiap Agenda wajib tidak bertentangan dengan AD/ART IKM PNJ serta seluruh ketetapan MPM PNJ. Meskipun bersifat internal, norma dasar organisasi tetap mengikat penuh.',
    scoreDescriptions: [
      { score: 25, label: 'Kurang', description: 'Terdapat pelanggaran signifikan terhadap norma dasar AD/ART; upaya penyesuaian sangat minim.' },
      { score: 50, label: 'Cukup', description: 'Sebagian besar sesuai; terdapat ketidaksesuaian minor yang tidak prinsipil.' },
      { score: 75, label: 'Baik', description: 'Hampir sepenuhnya sesuai; ketidaksesuaian sangat minor dan telah dikomunikasikan.' },
      { score: 100, label: 'Sangat Baik', description: 'Sepenuhnya sesuai dengan AD/ART dan seluruh ketetapan MPM PNJ yang berlaku.' },
    ],
  },
  {
    code: 'B2',
    name: 'Kesesuaian GBHK',
    weight: 12,
    legalBasis: 'TAP 002/TAP/MPM PNJ/II/2026 GBHK HMJ; TAP 008/2025 Pasal 36 ayat (3) huruf e',
    description:
      'Agenda wajib mencerminkan asas dan aspek GBHK HMJ yang disusun MPM PNJ. Seluruh Agenda harus dapat dikaitkan dengan minimal satu dari 16 asas dan 12 aspek GBHK.',
    scoreDescriptions: [
      { score: 25, label: 'Kurang', description: 'Mencerminkan sangat sedikit asas/aspek GBHK; arah kebijakan jauh dari selaras.' },
      { score: 50, label: 'Cukup', description: 'Mencerminkan sebagian besar asas/aspek GBHK; keselarasan cukup baik.' },
      { score: 75, label: 'Baik', description: 'Hampir seluruh Agenda selaras dengan GBHK HMJ; penyimpangan sangat minor.' },
      { score: 100, label: 'Sangat Baik', description: 'Seluruh pelaksanaan Agenda selaras penuh dengan GBHK HMJ yang disusun MPM.' },
    ],
  },
  {
    code: 'B3',
    name: 'Kesesuaian Mekanisme Pengawasan MPM',
    weight: 8,
    legalBasis: 'TAP 008 Pasal 26 ayat (1) dan (2); Pasal 36 ayat (3) huruf c',
    description:
      'Pelaksanaan Agenda wajib sesuai mekanisme pengawasan MPM PNJ. HMJ tetap wajib mengikuti prosedur koordinasi dan pelaporan kepada MPM PNJ.',
    scoreDescriptions: [
      { score: 25, label: 'Kurang', description: 'Mengikuti sangat sedikit mekanisme; prosedur koordinasi banyak dilewati.' },
      { score: 50, label: 'Cukup', description: 'Mengikuti sebagian besar mekanisme; penyimpangan minor telah dikomunikasikan.' },
      { score: 75, label: 'Baik', description: 'Hampir seluruh mekanisme diikuti; komunikasi ke MPM dilakukan dengan baik.' },
      { score: 100, label: 'Sangat Baik', description: 'Seluruh Agenda berjalan sesuai mekanisme pengawasan kelembagaan MPM PNJ.' },
    ],
  },
  {
    code: 'B4',
    name: 'Kesesuaian Rancangan Kerja',
    weight: 20,
    legalBasis: 'TAP 008 Pasal 13 ayat (2); Pasal 27 ayat (3) dan (4); Pasal 36 ayat (3) huruf g dan ayat (6) huruf a',
    description:
      'Pelaksanaan Agenda dibandingkan dengan susunan yang disahkan dalam Sidang Rapat Kerja. Rancangan Kerja adalah satu-satunya dokumen perencanaan formal untuk Agenda, sehingga parameter ini berbobot paling besar.',
    scoreDescriptions: [
      { score: 25, label: 'Kurang', description: 'Banyak deviasi dari Rancangan Kerja; sebagian besar tidak dilaporkan kepada MPM.' },
      { score: 50, label: 'Cukup', description: 'Sebagian besar Agenda sesuai Raker; deviasi minor telah dilaporkan ke MPM.' },
      { score: 75, label: 'Baik', description: 'Hampir seluruhnya sesuai Raker; deviasi kecil dilaporkan dengan baik.' },
      { score: 100, label: 'Sangat Baik', description: 'Seluruh pelaksanaan Agenda sesuai Rancangan Kerja yang disahkan dalam Sidang Raker.' },
    ],
  },
  {
    code: 'B5',
    name: 'Ketepatan Waktu Pelaksanaan',
    weight: 15,
    legalBasis: 'TAP 008 Pasal 36 ayat (6) huruf b',
    description:
      'Waktu pelaksanaan harus sesuai Rancangan Kerja dengan toleransi keterlambatan maksimal 7 hari. HMJ wajib berkoordinasi dengan MPM sebelum keterlambatan terjadi.',
    scoreDescriptions: [
      { score: 25, label: 'Kurang', description: 'Keterlambatan lebih dari 7 hari; koordinasi dilakukan namun setelah fakta terjadi.' },
      { score: 50, label: 'Cukup', description: 'Keterlambatan maksimal 7 hari; koordinasi dilakukan terlebih dahulu dengan MPM.' },
      { score: 75, label: 'Baik', description: 'Keterlambatan sangat kecil (1–2 hari); koordinasi proaktif dengan MPM.' },
      { score: 100, label: 'Sangat Baik', description: 'Agenda terlaksana tepat waktu sesuai Rancangan Kerja; tidak ada keterlambatan.' },
    ],
  },
  {
    code: 'B6',
    name: 'Capaian Target dan Parameter Keberhasilan',
    weight: 15,
    legalBasis: 'TAP 008 Pasal 13 ayat (2); Pasal 36 ayat (1) dan ayat (6) huruf a',
    description:
      'Keberhasilan diukur berdasarkan target dan parameter keberhasilan dalam Rancangan Kerja. Target Agenda umumnya bersifat internal.',
    scoreDescriptions: [
      { score: 25, label: 'Kurang', description: 'Target tercapai kurang dari 50%; efektivitas Agenda sangat rendah.' },
      { score: 50, label: 'Cukup', description: 'Target tercapai 50–79%; efektivitas Agenda cukup baik.' },
      { score: 75, label: 'Baik', description: 'Target tercapai 80–94%; hampir seluruh parameter keberhasilan terpenuhi.' },
      { score: 100, label: 'Sangat Baik', description: 'Seluruh target (95% ke atas) dan parameter keberhasilan Agenda tercapai sesuai Raker.' },
    ],
  },
  {
    code: 'B7',
    name: 'Pelaporan Progres kepada MPM PNJ',
    weight: 8,
    legalBasis: 'ART IKM PNJ Pasal 34 ayat (3); TAP 008 Pasal 26 ayat (4); Pasal 30',
    description:
      'HMJ wajib memberikan laporan lisan dan tertulis kepada MPM PNJ atas pelaksanaan Agenda secara berkala dan/atau bila diminta.',
    scoreDescriptions: [
      { score: 25, label: 'Kurang', description: 'Pelaporan hanya dilakukan saat diminta MPM; tidak ada inisiatif proaktif sama sekali.' },
      { score: 50, label: 'Cukup', description: 'Pelaporan cukup berkala; sebagian besar permintaan MPM direspons dengan baik.' },
      { score: 75, label: 'Baik', description: 'Pelaporan proaktif dan responsif; hampir seluruh ketentuan pelaporan terpenuhi.' },
      { score: 100, label: 'Sangat Baik', description: 'Pelaporan proaktif dan responsif; seluruh ketentuan pelaporan terpenuhi.' },
    ],
  },
  {
    code: 'B8',
    name: 'Akuntabilitas Keuangan',
    weight: 5,
    legalBasis: 'AD IKM PNJ Pasal 18 ayat (2) dan (4); ART IKM PNJ Pasal 50 ayat (1); Pasal 53',
    description:
      'Apabila Agenda melibatkan transaksi dana, pengelolaan wajib berlandaskan transparansi, keadilan, dan akuntabilitas. Jika tidak ada transaksi, dinilai berdasarkan ketertiban pencatatan nihil keuangan.',
    scoreDescriptions: [
      { score: 25, label: 'Kurang', description: 'Laporan ada namun tidak transparan; sebagian transaksi tanpa bukti yang sah.' },
      { score: 50, label: 'Cukup', description: 'Laporan keuangan disusun; sebagian besar transaksi disertai bukti yang sah.' },
      { score: 75, label: 'Baik', description: 'Laporan keuangan hampir lengkap; hampir seluruh transaksi terdokumentasi dengan baik.' },
      { score: 100, label: 'Sangat Baik', description: 'Laporan keuangan lengkap atau tercatat nihil; seluruh transaksi terdokumentasi dengan bukti sah.' },
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
      { score: 25, label: 'Kurang', description: 'Sebagian kecil dokumen sesuai Pedkes; banyak ketidaksesuaian format yang signifikan.' },
      { score: 50, label: 'Cukup', description: 'Sebagian besar dokumen sesuai Pedkes; terdapat kesalahan minor pada format.' },
      { score: 75, label: 'Baik', description: 'Hampir seluruh dokumen sesuai Pedkes; kesalahan sangat minor dan tidak prinsipil.' },
      { score: 100, label: 'Sangat Baik', description: 'Seluruh dokumen dari Agenda mengikuti Pedoman Kesekretariatan IKM PNJ.' },
    ],
  },
];
