import classes from "./Services.module.css";

const ServicesList = [
  {
    header: "Get to know us",
    services: ["Careers", "Blog", "About Amazon", "Amazon Relations"],
  },
  {
    header: "Make money with us",
    services: [
      "Sell products on Amazon",
      "Sell on Amazon Business",
      "Sell apps on Amazon",
      "Become an Affiliate",
      "Advertise Your Products",
    ],
  },
  {
    header: "Amazon Payment Products",
    services: [
      "Amazon Business Card",
      "Shop with Points",
      "Reload Your Balance",
      "Amazon Currency Converter",
    ],
  },
  {
    header: "Let Us Help You",
    services: [
      "Amazon and COVID-19",
      "Your Account",
      "Your Orders",
      "Shipping Rates & Policies",
      "Returns & Replacements",
    ],
  },
];

export default function Services() {
  return (
    <div className={classes.servicesContainer}>
      <div className={classes.servicesNavLinksContainer}>
        {ServicesList.map((list) => (
          <div key={list.header}>
            <p>{list.header}</p>
            <ul>
              {list.services.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
