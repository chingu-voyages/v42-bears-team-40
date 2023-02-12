import { Status, Category } from '@prisma/client';

type SeedData = {
  title: string;
  category: Category;
  picture: string;
  status: Status;
};

export const seedData: SeedData[] = [
  {
    title: 'Book Collection',
    category: 'books',
    picture:
      'https://res.cloudinary.com/ljmccode/image/upload/v1676083634/jpiabbb2punzljbxrlxh.jpg',
    status: 'available',
  },
  {
    title: 'Random Books',
    category: 'books',
    picture:
      'https://res.cloudinary.com/ljmccode/image/upload/v1676083738/ooav5ao3xscpysfgnn2e.jpg',
    status: 'available',
  },
  {
    title: 'Cookbook',
    category: 'books',
    picture:
      'https://res.cloudinary.com/ljmccode/image/upload/v1676083772/lt3ot2t3bkrrnkrrbxj2.jpg',
    status: 'pending',
  },
  {
    title: 'Cute dress',
    category: 'clothing',
    picture:
      'https://res.cloudinary.com/ljmccode/image/upload/v1676083836/hx2wqovykckoyp4kvxhb.jpg',
    status: 'available',
  },
  {
    title: 'Winter Coat',
    category: 'clothing',
    picture:
      'https://res.cloudinary.com/ljmccode/image/upload/v1676083871/iaqz2caar3pivtnt2gkd.jpg',
    status: 'pending',
  },
  {
    title: 'Nike Shoes',
    category: 'clothing',
    picture:
      'https://res.cloudinary.com/ljmccode/image/upload/v1676083808/lufjrgjqdswu398its5k.jpg',
    status: 'sold',
  },
  {
    title: 'Stamps',
    category: 'crafts',
    picture:
      'https://res.cloudinary.com/ljmccode/image/upload/v1676083906/j0q7gay8z9jj0dlqolxm.jpg',
    status: 'available',
  },
  {
    title: 'Craft Set',
    category: 'crafts',
    picture:
      'https://res.cloudinary.com/ljmccode/image/upload/v1676083930/bmqedfeukkocyzndnx6p.jpg',
    status: 'pending',
  },
  {
    title: 'Beads',
    category: 'crafts',
    picture:
      'https://res.cloudinary.com/ljmccode/image/upload/v1676083952/q4kb1pk3p7w1sgonsz87.jpg',
    status: 'available',
  },
  {
    title: 'Foldable Phone',
    category: 'electronics',
    picture:
      'https://res.cloudinary.com/ljmccode/image/upload/v1676083991/fgx1loysjjmsuaumxyup.jpg',
    status: 'available',
  },
  {
    title: 'Headphones',
    category: 'electronics',
    picture:
      'https://res.cloudinary.com/ljmccode/image/upload/v1676084013/tdkwymwuu7dmmo2dyoy9.jpg',
    status: 'sold',
  },
  {
    title: 'Computer Mouse',
    category: 'electronics',
    picture:
      'https://res.cloudinary.com/ljmccode/image/upload/v1676084039/a9z3gmkdspsxwcoa6786.jpg',
    status: 'pending',
  },
  {
    title: 'Bed Frame',
    category: 'furniture',
    picture:
      'https://res.cloudinary.com/ljmccode/image/upload/v1676084070/rpsvqj7tj2ox6ubkpvrk.jpg',
    status: 'available',
  },
  {
    title: 'Work Desk',
    category: 'furniture',
    picture:
      'https://res.cloudinary.com/ljmccode/image/upload/v1676084097/a0ja0oxmzi2kkvdtpfd0.jpg',
    status: 'pending',
  },
  {
    title: 'Big Couch',
    category: 'furniture',
    picture:
      'https://res.cloudinary.com/ljmccode/image/upload/v1676084121/n1l0uveaqgbdxch6vrfe.jpg',
    status: 'sold',
  },
  {
    title: 'Meme Game',
    category: 'games',
    picture:
      'https://res.cloudinary.com/ljmccode/image/upload/v1676084172/hc5xsvuj6znm8exdjg0q.jpg',
    status: 'available',
  },
  {
    title: 'Marvel Card Game',
    category: 'games',
    picture:
      'https://res.cloudinary.com/ljmccode/image/upload/v1676084210/qndeevxggqkhtezvhe73.jpg',
    status: 'available',
  },
  {
    title: 'Fun Kids Game',
    category: 'games',
    picture:
      'https://res.cloudinary.com/ljmccode/image/upload/v1676084244/xzvprz7nuzlx7qlirbz2.jpg',
    status: 'pending',
  },
  {
    title: 'Trash bin',
    category: 'kitchen',
    picture:
      'https://res.cloudinary.com/ljmccode/image/upload/v1676215559/iehrhlwfuwrgokqjloop.jpg',
    status: 'available',
  },
  {
    title: 'Coffee Maker',
    category: 'kitchen',
    picture:
      'https://res.cloudinary.com/ljmccode/image/upload/v1676218694/qjahex4urhwk5t9uxyuv.jpg',
    status: 'pending',
  },
  {
    title: 'Kitchen Utensils',
    category: 'kitchen',
    picture:
      'https://res.cloudinary.com/ljmccode/image/upload/v1676219104/n7nxdddsetfbjngv3icp.jpg',
    status: 'available',
  },
  {
    title: 'Bambi',
    category: 'movies',
    picture:
      'https://res.cloudinary.com/ljmccode/image/upload/v1676219137/f2xopjqb44awbodxb8lf.jpg',
    status: 'available',
  },
  {
    title: 'Movie Collection',
    category: 'movies',
    picture:
      'https://res.cloudinary.com/ljmccode/image/upload/v1676219256/zrp5vmfbv28znkjctaer.jpg',
    status: 'available',
  },
  {
    title: 'Columbo Set',
    category: 'movies',
    picture:
      'https://res.cloudinary.com/ljmccode/image/upload/v1676219194/xn707bqt543knrr0jgad.jpg',
    status: 'sold',
  },
  {
    title: 'Keyboard',
    category: 'music',
    picture:
      'https://res.cloudinary.com/ljmccode/image/upload/v1676219344/dckaijn27urmmbiitsve.jpg',
    status: 'pending',
  },
  {
    title: 'Flute',
    category: 'music',
    picture:
      'https://res.cloudinary.com/ljmccode/image/upload/v1676219391/gxelvzgwz04q2equejnl.jpg',
    status: 'available',
  },
  {
    title: 'Speaker',
    category: 'music',
    picture:
      'https://res.cloudinary.com/ljmccode/image/upload/v1676220329/khexofzzmezerjrh8x9p.jpg',
    status: 'sold',
  },
  {
    title: 'ATV Tires',
    category: 'other',
    picture:
      'https://res.cloudinary.com/ljmccode/image/upload/v1676219421/ej02mprdbuwoitti026d.jpg',
    status: 'available',
  },
  {
    title: 'Motorbike',
    category: 'other',
    picture:
      'https://res.cloudinary.com/ljmccode/image/upload/v1676219496/mpff3pcn1gzirjevuh9l.jpg',
    status: 'sold',
  },
  {
    title: 'Grill',
    category: 'outdoors',
    picture:
      'https://res.cloudinary.com/ljmccode/image/upload/v1676219616/pgq6vaxzbydk8ggrx0ki.jpg',
    status: 'available',
  },
  {
    title: 'Water Fountain',
    category: 'outdoors',
    picture:
      'https://res.cloudinary.com/ljmccode/image/upload/v1676219691/rks17exvrgtaud4dtuyi.jpg',
    status: 'available',
  },
  {
    title: 'Play swing',
    category: 'outdoors',
    picture:
      'https://res.cloudinary.com/ljmccode/image/upload/v1676219722/wzoyrnzqoq3m4hmkbqj8.jpg',
    status: 'available',
  },
  {
    title: 'Golf Clubs',
    category: 'sports',
    picture:
      'https://res.cloudinary.com/ljmccode/image/upload/v1676220557/mlj9buejglw1issayurr.jpg',
    status: 'pending',
  },
  {
    title: 'Canoe',
    category: 'sports',
    picture:
      'https://res.cloudinary.com/ljmccode/image/upload/v1676220575/lkhogpjsphrh0z311z6s.jpg',
    status: 'pending',
  },
  {
    title: 'Weights',
    category: 'sports',
    picture:
      'https://res.cloudinary.com/ljmccode/image/upload/v1676219809/baoqujcrpxy0hkzfyyyd.jpg',
    status: 'available',
  },
  {
    title: 'Toy Car Slide',
    category: 'toys',
    picture:
      'https://res.cloudinary.com/ljmccode/image/upload/v1676219747/nqcashmikvzkquyvhk5j.jpg',
    status: 'sold',
  },
  {
    title: 'Minnie Toy Microwave',
    category: 'toys',
    picture:
      'https://res.cloudinary.com/ljmccode/image/upload/v1676219764/qv4stnqtzgwkuerwgsmw.jpg',
    status: 'available',
  },
  {
    title: 'Stuffed animal',
    category: 'toys',
    picture:
      'https://res.cloudinary.com/ljmccode/image/upload/v1676219784/lpvxhvwxp8cnsaugfo6y.jpg',
    status: 'available',
  },
];
