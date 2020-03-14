export const baseUrl = 'http://123.207.32.32:8000';
export function jpg(page, type) {
  const names= [
    '高腰性感超短裙女款公主裙比身夏2019新款半身小短裙 红色 单裙不含模特上衣 均码 130斤内适穿',
    '朗悦女装 短裙女2020年夏季百褶裙短裙韩版学院风格子网球裙半身裙女 LWQZ192172',
    '幂缇莎背带裙连衣裙夏2019新款夏季女春秋学生韩版套装仙女超仙森系裙子',
    '丹慕妮尔裙子早春装2020年新款洋气减龄名媛气质显瘦小香风连衣裙 粉色 175/96A/XXL',
    '纽曼之城背带裙女装2020韩版夏季修身V领弹力中长款开叉高腰连衣裙两件套办公室工作服 9901-背带裙 L 建议100-115斤',
    'YAYA鸭鸭服饰针织连衣裙女2020年春装新款女装两件显瘦流行毛衣裙子半高领气质针织裙新款 图片色 L 【建议105-115斤】',
    'YAYA鸭鸭服饰针织连衣裙女2020春季新款假两件显瘦流行打底毛衣女裙子气质针织连衣裙新款加绒',
    '南极人 连衣裙2020春款女装新款民族风长袖连衣裙 中长款女士网红打底A字裙子 N5-GTAF02-021',
    '目迹春季连衣裙2020年新款两件套春装新款女时尚小香风气质显瘦套装裙子潮 L 建议105~115斤',
    '三彩2019冬季新款花边立领喇叭袖蕾丝裙网纱大摆仙女中长连衣裙女'
  ];
  const titles=[
    '性感超短裙',
    '朗悦女装',
    '幂缇莎',
    '早春装',
    '纽曼之城',
    '鸭鸭服饰',
    '针织连衣裙',
    '南极人',
    '目迹春季',
    '三彩2020'
  ];
  switch (type) {
    case 'pop':
      return [{ url: '/assets/good/' + (page % 5 != 0 ? page % 5 * 2 - 1 : 9) + '.jpg', name: names[page % 5 != 0 ? page % 5 * 2 - 2 : 8], title: titles[page % 5 != 0 ? page % 5 * 2 - 2 : 8], money: '￥' + (Math.floor(Math.random() * 50) * 10 + 500) }, { url: '/assets/good/' + (page % 5 != 0 ? page % 5 * 2 : 10) + '.jpg', name: names[page % 5 != 0 ? page % 5 * 2 - 1 : 9], title: titles[page % 5 != 0 ? page % 5 * 2 - 1 : 9], money: '￥' + (Math.floor(Math.random() * 50) * 10 + 500) },];
    case 'new':
      return [{ url: '/assets/good/' + ((page + 2) % 5 != 0 ? (page + 2) % 5 * 2 - 1 : 9) + '.jpg', name: names[(page + 2) % 5 != 0 ? (page + 2) % 5 * 2 - 2 : 8], title: titles[(page + 2) % 5 != 0 ? (page + 2) % 5 * 2 - 2 : 8], money: '￥' + (Math.floor(Math.random() * 50) * 10 + 500) }, { url: '/assets/good/' + ((page + 2) % 5 != 0 ? (page + 2) % 5 * 2 : 10) + '.jpg', name: names[(page + 2) % 5 != 0 ? (page + 2) % 5 * 2 - 1 : 9], title: titles[(page + 2) % 5 != 0 ? (page + 2) % 5 * 2 - 1 : 9], money: '￥' + (Math.floor(Math.random() * 50) * 10 + 500) }];
    case 'sell':
      return [{ url: '/assets/good/' + ((page + 4) % 5 != 0 ? (page + 4) % 5 * 2 - 1 : 9) + '.jpg', name: names[(page + 4) % 5 != 0 ? (page + 4) % 5 * 2 - 2 : 8], title: titles[(page + 4) % 5 != 0 ? (page + 4) % 5 * 2 - 2 : 8], money: '￥' + (Math.floor(Math.random() * 50) * 10 + 500) }, { url: '/assets/good/' + ((page + 4) % 5 != 0 ? (page + 4) % 5 * 2 : 10) + '.jpg', name: names[(page + 4) % 5 != 0 ? (page + 4) % 5 * 2 - 1 : 9], title: titles[(page + 4) % 5 != 0 ? (page + 4) % 5 * 2 - 1 : 9], money: '￥' + (Math.floor(Math.random() * 50) * 10 + 500) }];
  }
}