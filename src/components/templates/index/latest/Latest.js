import Link from "next/link";
import styles from "./latest.module.css";
import { FaChevronLeft } from "react-icons/fa6";
import Product from "@/components/modules/product/Product";
import ProductModel from "@/models/Product";

const Latest = async () => {
  const products = await ProductModel.find().lean();
  return (
    <div className={styles.container}>
      <section className={styles.title}>
        <div>
          <p>آخرین محصولات</p>
          <span>Latest products</span>
        </div>
        <Link className={styles.link} href={"/category"}>
          مشاهده همه <FaChevronLeft />{" "}
        </Link>
      </section>
      <main data-aos="fade-up" className={styles.products}>
        {products.map((product) => (
          <Product key={product._id} {...product} />
        ))}
      </main>
    </div>
  );
};

export default Latest;
