const baseURL = "http://localhost:8080/";

// UserMfoody
export const userUrls = {
  user_add_local: baseURL + "user/add",
  user_countTotalNumber_local: baseURL + "user/countTotal",
  user_getAll_local: baseURL + "user/getAll",
  user_getByID_local: baseURL + "user/get/",
  user_edit_local: baseURL + "user/edit",
  user_deleteByID_local: baseURL + "user/delete/",
  user_getByEmail_local: baseURL + "user/getByEmail/"
};

// ProductMfoody
export const productUrls = {
  product_add_local: baseURL + "product/add",
  product_countTotalNumber_local: baseURL + "product/countTotal",
  product_getAll_local: baseURL + "product/getAll",
  product_getByID_local: baseURL + "product/get/",
  product_edit_local: baseURL + "product/edit",
  product_deleteByID_local: baseURL + "product/delete/"
};

// OrderMfoody
export const orderUrls = {
  order_add_local: baseURL + "order/add",
  order_countTotalNumber_local: baseURL + "order/countTotal",
  order_getAll_local: baseURL + "order/getAll",
  order_getAllByIDUser_local: baseURL + "order/getByIdUser/",
  order_getByID_local: baseURL + "order/get/",
  order_edit_local: baseURL + "order/edit",
  order_deleteByID_local: baseURL + "order/delete/",
  order_deleteByIDUser_local: baseURL + "order/deleteByIdUser/"
};

// CartMfoody
export const cartUrls = {
  cart_getAllByIDUser_local: baseURL + "cart/getByIdUser/",
  cart_getByID_local: baseURL + "cart/get/",
};

// CreditCardMfoody
export const creditCardUrls = {
  credit_card_add_local: baseURL + "creditcard/add",
  credit_card_edit_local: baseURL + "creditcard/edit",
  credit_card_getByID_local: baseURL + "creditcard/get/",
  credit_card_getAllByIDUser_local: baseURL + "creditcard/getByIdUser/",
  credit_card_deleteByID_local: baseURL + "creditcard/delete/"
};

// Feedback
export const feedbackUrls = {
  feedback_add_local: baseURL + "feedback/add",
  feedback_countTotalNumber_local: baseURL + "feedback/countTotal",
  feedback_getAll_local: baseURL + "feedback/getAll",
  feedback_getByID_local: baseURL + "feedback/get/",
  feedback_edit_local: baseURL + "feedback/edit",
  feedback_deleteByID_local: baseURL + "feedback/delete/"
};

// CommentMfoody
export const commentUrls = {
  comment_add_local: baseURL + "comment/add",
  comment_edit_local: baseURL + "comment/edit",
  comment_getByID_local: baseURL + "comment/get/",
  comment_getAllByIDUser_local: baseURL + "comment/getByIdUser/",
  comment_getAllByIDProduct_local: baseURL + "comment/getByIdProduct/",
  comment_getAll_local: baseURL + "comment/getAll",
  comment_countTotalNumber_local: baseURL + "comment/countTotal",
  comment_deleteByID_local: baseURL + "comment/delete/",
  comment_deleteAllByIDUser_local: baseURL + "comment/deleteByIdUser/",
  comment_deleteAllByIDProduct_local: baseURL + "comment/deleteByIdProduct/"
};

// FavoriteListProductMfoody
export const favoriteListUrls = {
  favorite_list_getAllByIDUser_local: baseURL + "favoriteListProducts/getByIdUser/",
};

// FavoriteProductMfoody
export const favoriteProductUrls = {
  favorite_product_add_local: baseURL + "favoriteProduct/add",
  favorite_product_deleteByIDs_local: baseURL + "favoriteProduct/delete/idFavoriteListProducts/"
  // favorite_product_deleteByIDs_local: baseURL + "favoriteProduct/delete/idFavoriteListProducts/350060/idProduct/530022",
};

// DetailProductOrderMfoody
export const detailProductOrderUrls = {
  detail_product_order_add_local: baseURL + "detailProductOrder/add",
  detail_product_order_add_array_local: baseURL + "detailProductOrder/addArrayObjects",
  detail_product_order_deleteByIDs_local: baseURL + "detailProductOrder/delete/idOrder/"
  // favorite_product_deleteByIDs_local: baseURL + "favoriteProduct/delete/idFavoriteListProducts/350060/idProduct/530022",
};

// DetailProductOrderMfoody
export const detailProductCartUrls = {
  detail_product_cart_add_local: baseURL + "detailProductCart/add",
  detail_product_cart_add_array_local: baseURL + "detailProductCart/addArrayObjects",
  detail_product_cart_deleteByIDs_local: baseURL + "detailProductCart/delete/idCart/",
  detail_product_cart_deleteByIdCart_local: baseURL + "detailProductCart/deleteByIdCart/"
  // favorite_product_deleteByIDs_local: baseURL + "favoriteProduct/delete/idFavoriteListProducts/350060/idProduct/530022",
};

// Application
export const applicationUrls = {
  application_login_local: baseURL + "applicationMfoody/login",
  application_logout_local: baseURL + "applicationMfoody/logout"
};
