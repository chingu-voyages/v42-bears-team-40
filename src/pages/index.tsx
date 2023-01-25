import Layout from '../components/Layout';
import Item from '../components/Item';
import { ItemType } from '../components/Item';

const items: ItemType[] = [
  {
    itemId: '123abc',
    title: 'Chemex',
    description: 'Lightly used, perfect for pour over coffee',
    picture:
      'https://cdn.shopify.com/s/files/1/0511/2040/6715/products/chemex-3-cup-coffee-maker_1195x.jpg?v=1605590260',
    price: 34,
    status: 'available',
    category: 'Kitchen',
    userId: 'sellerabc',
  },
  {
    itemId: '456def',
    title: 'Rocking Chair',
    description: 'Great rocking chair for a porch made with eucalyptus grandis',
    picture:
      'https://secure.img1-fg.wfcdn.com/im/03511544/compr-r85/1856/185653174/channel-tufted-rocking-chair-with-metal-base.jpg',
    price: 150,
    status: 'available',
    category: 'Furniture',
    userId: 'sellerabc',
  },
  {
    itemId: '789ghi',
    title: 'HDTV',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. In, mollitia. Omnis qui tempore harum. Repudiandae ratione, incidunt?',
    picture:
      'https://www.gannett-cdn.com/presto/2022/03/03/USAT/77204937-1c70-4d43-bbec-a8cf4ac6d59e-Vizio-V-Series-2021-Color-Production.jpg',
    price: 300,
    status: 'available',
    category: 'Electronics',
    userId: 'sellerabc',
  },
  {
    itemId: '012jkl',
    title: 'Jean Jacket',
    description: 'Lorem ipsum dolor sit amet consectetur adipisic',
    picture:
      'https://cdn11.bigcommerce.com/s-b1nxqcmq/images/stencil/1280x1280/products/234/2582/Jacket_stock_front__48827.1673291076.jpg?c=2',
    price: 84,
    status: 'available',
    category: 'Fashion',
    userId: 'sellerabc',
  },
];

const Search = () => {
  return (
    <Layout>
      <section className='item-section grid justify-center'>
        <div className='item-section-center'>
          {items.map((singleItem) => (
            <Item key={singleItem.itemId} item={singleItem} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Search;
