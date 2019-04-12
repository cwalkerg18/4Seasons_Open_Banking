namespace SalesViewer.Models.Dtos {
    public class ProductsDto {
        public ProductsDto() { }

        public ProductsDto(Product product) {
            this.id = product.id;
            this.name = product.name;
            this.description = product.description;
            this.baseCost = product.baseCost;
            this.listPrice = product.listPrice;
            this.unitsInInventory = product.unitsInInventory;
            this.unitsInManufacturing = product.unitsInManufactoring;
            this.plant = product.plant;
            this.sManager = product.sManager;
            this.pManager = product.pManager;
        }

        public int id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public decimal baseCost { get; set; }
        public decimal listPrice { get; set; }
        public int unitsInInventory { get; set; }
        public int unitsInManufacturing { get; set; }
        public string plant { get; set; }
        public string sManager { get; set; }
        public string pManager { get; set; }
    }
}