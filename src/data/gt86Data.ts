export type SpecStageId = 'street' | 'track';

export interface VehicleSpec {
  id: SpecStageId;
  code: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  surfaceNote: string;
  weightKg: string;
  downforceNote: string;
  aeroPackage: string;
  roofSpec: string;
  frontLip: string;
  rearWing: string;
  plate: string;
  highlights: string[];
}

export interface DossierItem {
  index: string;
  title: string;
  category: string;
  summary: string;
  specDetail: string;
  metricLabel: string;
  metricValue: string;
}

export interface CircuitProfile {
  id: string;
  name: string;
  region: string;
  lengthKm: string;
  corners: number;
  spec01Lap: string;
  spec02Lap: string;
  deltaSeconds: string;
  topSpeedKmh: string;
  peakLateralG: string;
  notes: string;
}

export const VEHICLE_SPECS: Record<SpecStageId, VehicleSpec> = {
  street: {
    id: 'street',
    code: '式樣 01',
    title: '街道競技初階式樣',
    subtitle: '輕量化碳纖引擎蓋 · 原廠車頂輪廓 · 低風阻純粹比例',
    imageSrc: './assets/aistudio/1_17057992.webp',
    imageAlt: 'Toyota GT86 #86 紅色車身搭配碳纖維引擎蓋與藤澤 386 車牌（初階街道式樣）',
    surfaceNote: '純白棚拍原稿圖 · Clean Homologation Studio Plate',
    weightKg: '1,230 kg',
    downforceNote: '標準街道氣流導向 · 低風阻設定',
    aeroPackage: '無尾翼 · 原廠側裙與前保桿下緣',
    roofSpec: '車身同色競技紅車頂',
    frontLip: '原廠空力前保桿',
    rearWing: '無高聳尾翼（純粹 Fastback 線條）',
    plate: '藤沢 386 な 9-101',
    highlights: [
      '保留 GT86 原廠流線車尾與低重心設定',
      '消光碳纖維引擎蓋與 BLITZ 葉子板徽飾',
      '五輻槍灰色輕量化輪圈與性能胎組',
      '車門 #86 競技字體與藤澤 386 號牌',
    ],
  },
  track: {
    id: 'track',
    code: '式樣 02',
    title: '2.0 NA 賽道空力式樣',
    subtitle: '全套下壓力套件 · 碳纖車頂 · 高角度 GT 尾翼',
    imageSrc: './assets/aistudio/postcard_d46ddfe2.jpg',
    imageAlt: '2.0 NA GT86 賽道空力演化版明信片，搭載碳纖維車頂、前下擾流、側裙與大型 GT 尾翼',
    surfaceNote: 'Pit Wall 水泥明信片原稿 · 含 QR 識別與 2.0 NA GT86 字樣',
    weightKg: '1,218 kg',
    downforceNote: '高速彎尾翼下壓力顯著提升 · 前後空力平衡',
    aeroPackage: '前下擾流定風翼 · 競技側裙 · 大型 GT 尾翼',
    roofSpec: '輕量化消光碳纖維車頂',
    frontLip: '紅黑雙色前下擾流唇與側定風翼',
    rearWing: '高支架雙柱式碳纖 GT 尾翼',
    plate: '藤沢 386 な 9-101',
    highlights: [
      '車頂升級碳纖維材質，進一步降低重心',
      '車頭加裝雙層前下擾流，抑制高速浮舉',
      '車側整合寬體感黑色空力側裙組',
      '車尾配置大型 GT 尾翼，強化出彎循跡性',
    ],
  },
};

export const HERO_TELEMETRY_STRIP = [
  {label: '動力單元', value: 'FA20 2.0L 水平對臥自然進氣'},
  {label: '斷油轉速', value: '7,450 RPM 高轉域設定'},
  {label: '驅動架構', value: '前置引擎 · 後輪驅動 (FR)'},
  {label: '車身識別', value: '藤沢 386 な 9-101 · #86'},
];

export const DOSSIER_ITEMS: DossierItem[] = [
  {
    index: '01',
    title: '自然進氣動力與 BLITZ 進氣調校',
    category: '動力總成',
    summary:
      '維持 2.0 升 FA20 水平對臥四缸自然進氣本體，強調線性油門反應與 7,000 轉以上的高轉延展性，葉子板上的 BLITZ 廠徽象徵進氣效率與冷卻系統的實戰強化。',
    specDetail: '200 PS / 7,000 rpm · 205 Nm / 6,400 rpm',
    metricLabel: '壓縮比',
    metricValue: '12.5 : 1',
  },
  {
    index: '02',
    title: '雙階空力套件與碳纖輕量化演化',
    category: '空氣力學',
    summary:
      '從式樣 01 的純粹 Fastback 車身線條，演化至式樣 02 的消光碳纖維車頂、前下擾流唇、側裙與高支架 GT 尾翼，將高速煞車穩定性與中高速彎道貼地性推向賽道規格。',
    specDetail: '碳纖引擎蓋 + 碳纖車頂 + 競技前唇 / 側裙 / GT 尾翼',
    metricLabel: '空力重心降幅',
    metricValue: '-12 kg 車頂減重',
  },
  {
    index: '03',
    title: '五輻槍灰鍛造鋁圈與煞車散熱',
    category: '底盤足下',
    summary:
      '五輻星形槍灰色鋁圈提供極大化開孔散熱空間，讓前輪煞車卡鉗在連續山道與賽道重煞下維持穩定工作溫度，並與紅黑車身形成強烈視覺張力。',
    specDetail: '18 吋五輻槍灰圈 · 高抓地力半熱熔街胎',
    metricLabel: '前後配重比',
    metricValue: '53 : 47',
  },
  {
    index: '04',
    title: '藤澤 386 賽事塗裝與 #86 競技番號',
    category: '視覺塗裝',
    summary:
      '承襲山道與公路巡迴賽經典精神，鮮紅主色車身配搭白色 #86 門號與神奈川縣「藤沢 386 な 9-101」車牌，在水泥 Pit 牆質感背景中展現強烈競技氣場。',
    specDetail: '競技紅主漆 · #86 門號 · 水泥牆明信片仕樣',
    metricLabel: '輪距軸長',
    metricValue: '2,570 mm',
  },
];

export const CIRCUIT_PROFILES: CircuitProfile[] = [
  {
    id: 'tsukuba',
    name: '筑波賽車場 TC2000',
    region: '日本茨城縣',
    lengthKm: '2.045 km',
    corners: 12,
    spec01Lap: '1:05.840',
    spec02Lap: '1:04.120',
    deltaSeconds: '-1.720 s',
    topSpeedKmh: '186 km/h',
    peakLateralG: '1.34 G',
    notes: '緊湊低中速複合彎為主，式樣 02 的前下擾流與 GT 尾翼在最終 80R 高速右彎帶來更早全油門出彎時機。',
  },
  {
    id: 'fuji',
    name: '富士國際賽車場',
    region: '日本靜岡縣',
    lengthKm: '4.563 km',
    corners: 16,
    spec01Lap: '2:06.410',
    spec02Lap: '2:03.790',
    deltaSeconds: '-2.620 s',
    topSpeedKmh: '224 km/h',
    peakLateralG: '1.41 G',
    notes: '1.475 公里大直線尾端與 100R 長右彎極度考驗高速下壓力，碳纖車頂與尾翼讓高速切換車道更安定。',
  },
  {
    id: 'hakone',
    name: '箱根ターンパイク山道',
    region: '日本神奈川縣',
    lengthKm: '13.78 km',
    corners: 28,
    spec01Lap: '7:48.300',
    spec02Lap: '7:41.950',
    deltaSeconds: '-6.350 s',
    topSpeedKmh: '198 km/h',
    peakLateralG: '1.28 G',
    notes: '連續下坡與長距離高速S彎，式樣 01 勝在靈活輕快，式樣 02 則在中高速拋彎展現更深厚抓地極限。',
  },
];
