interface Image {
  thumbnail: string;
  large: string;
}

interface Tag {
  id: number;
  name: string;
  slug: string;
}

export type Product = {
  id: number;
  images: Image;
  name: string;
  description?: string;
  on_sale: boolean;
  price: number;
  stock_quantity: number;
  stock_status: string;
  tags: Tag[];
};

export type CartProduct = Product & {
  amount: number;
  total_price: number;
};
