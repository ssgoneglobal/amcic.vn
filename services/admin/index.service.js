const indexPage = (req, res) => {
    res.render("index", {title: "Trang chủ", hasntTitle: true},);
};
const servicesPage = (req, res) => {
    res.render("services", {title: "Sản phẩm và dịch vụ"});
}


export {indexPage, servicesPage};
