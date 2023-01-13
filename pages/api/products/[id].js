import dbConnect from "../../../db/connect";
import Product from "../../../db/models/Product";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const product = await Product.findById(id).populate("reviews");

    if (!product) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(product);
  }
  if (request.method === "PATCH") {
    const updatedProduct = await Product.findByIdAndUpdate(id, {
      $set: request.body,
    });
    console.log(updatedProduct);
    response.status(200).json({ status: "Product updated" });
  }
  if (request.method === "DELETE") {
    const deletedProduct = await Product.findByIdAndDelete(id);
    return response.status(200).json({ status: "Product deleted" });
  }

  return response.status(405).json({ status: "Method not allowed" });
}
