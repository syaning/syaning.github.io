const moments = [
  {
    file: '20250531.jpeg',
    location: '上海·西岸',
    desc: '开心的小狗。',
  },
  {
    file: '20250308.jpeg',
    location: '神仙居',
    desc: '',
  },
  {
    file: '20250307.jpeg',
    location: '台州·国清寺',
    desc: '',
  },
  {
    file: '20241115.jpeg',
    location: '厦门',
    desc: '令人震撼的日出。',
  },
  {
    file: '20240720.jpeg',
    location: '无锡·寄畅园',
    desc: '',
  },
  {
    file: '20231208.jpeg',
    location: '',
    desc: 'Happy Christmas!',
  },
  {
    file: '20230825.jpeg',
    location: '雁荡山',
    desc: '',
  },
  {
    file: '20220916.webp',
    location: '安吉',
    desc: '团建。体验了许多游乐项目。',
  },
  {
    file: '20210915.webp',
    location: '',
    desc: '吃下一盘石榴。',
  },
  {
    file: '20210514.webp',
    location: '深圳·宝安国际机场',
    desc: '机场的屋顶有一种宏大的秩序感。',
  },
  {
    file: '20210502.webp',
    location: 'FDU',
    desc: '旧地重游，熟悉而又陌生。',
  },
  {
    file: '20210402.webp',
    location: '',
    desc: '故乡的油菜花开了。',
  },
  {
    file: '20210110.webp',
    location: '上海·西岸美术馆',
    desc: '邂逅展览——设计与奇思。',
  },
  {
    file: '20201101.webp',
    location: '上海植物园',
    desc: '一种莫名的难过。',
  },
  {
    file: '20201010.webp',
    location: '苏州',
    desc: '秋日的黄昏。',
  },
  {
    file: '20201007.webp',
    location: '上海',
    desc: '沿着外滩附近随意走走。',
  },
  {
    file: '20200503.webp',
    location: '象山',
    desc: '仿佛走到了世界的尽头。',
  },
  {
    file: '20200406.webp',
    location: '崇明',
    desc: '仿佛走到了世界尽头。',
  },
  {
    file: '20200126.webp',
    location: '',
    desc: '故乡的老房子。',
  },
  {
    file: '20191101.webp',
    location: '福州',
    desc: '难得的休假。',
  },
  {
    file: '20191006.webp',
    location: '郑州',
    desc: '郑州东站，也是对郑州最熟悉的地方。',
  },
  {
    file: '20190607.webp',
    location: '西安',
    desc: '',
  },
  {
    file: '20180521.webp',
    location: '马来西亚·亚庇',
    desc: '早起，坐在码头上看朝霞。',
  },
  {
    file: '20171219.webp',
    location: '',
    desc: '卖酒的掌柜写的信笺。',
  },
  {
    file: '20170320.webp',
    location: '大连·老虎滩海洋公园',
    desc: '',
  },
]

/** `20250531.jpeg` → `2025.05.31` */
export function timeFromFile(file) {
  const matched = /^(\d{4})(\d{2})(\d{2})\./.exec(file)
  return matched ? `${matched[1]}.${matched[2]}.${matched[3]}` : ''
}

export default {
  load() {
    return moments.map((item) => ({
      ...item,
      time: timeFromFile(item.file),
    }))
  },
}
