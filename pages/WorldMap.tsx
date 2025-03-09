import React, { useRef, useEffect, forwardRef, useState } from "react";
import Navbar from "@components/navbars/Navbar";
import AustraliaSVG from "/public/assets/world.svg"; // Import the SVG component
import { isDark } from "@components/ToggleThemeButton";
import clsx from "clsx";
import { useTheme } from "next-themes";

const countries = [
  { title: "Andorra", id: "AD" },
  { title: "United Arab Emirates", id: "AE" },
  { title: "Afghanistan", id: "AF" },
  { title: "Antigua and Barbuda", id: "AG" },
  { title: "Anguilla", id: "AI" },
  { title: "Albania", id: "AL" },
  { title: "Armenia", id: "AM" },
  { title: "Angola", id: "AO" },
  { title: "Argentina", id: "AR" },
  { title: "American Samoa", id: "AS" },
  { title: "Austria", id: "AT" },
  { title: "Australia", id: "AU" },
  { title: "Aruba", id: "AW" },
  { title: "Aland Islands", id: "AX" },
  { title: "Azerbaijan", id: "AZ" },
  { title: "Bosnia and Herzegovina", id: "BA" },
  { title: "Barbados", id: "BB" },
  { title: "Bangladesh", id: "BD" },
  { title: "Belgium", id: "BE" },
  { title: "Burkina Faso", id: "BF" },
  { title: "Bulgaria", id: "BG" },
  { title: "Bahrain", id: "BH" },
  { title: "Burundi", id: "BI" },
  { title: "Benin", id: "BJ" },
  { title: "Saint Barthelemy", id: "BL" },
  { title: "Brunei Darussalam", id: "BN" },
  { title: "Bolivia", id: "BO" },
  { title: "Bermuda", id: "BM" },
  { title: "Bonaire, Saint Eustachius and Saba", id: "BQ" },
  { title: "Brazil", id: "BR" },
  { title: "Bahamas", id: "BS" },
  { title: "Bhutan", id: "BT" },
  { title: "Bouvet Island", id: "BV" },
  { title: "Botswana", id: "BW" },
  { title: "Belarus", id: "BY" },
  { title: "Belize", id: "BZ" },
  { title: "Canada", id: "CA" },
  { title: "Cocos (Keeling) Islands", id: "CC" },
  { title: "Democratic Republic of Congo", id: "CD" },
  { title: "Central African Republic", id: "CF" },
  { title: "Republic of Congo", id: "CG" },
  { title: "Switzerland", id: "CH" },
  { title: "Côte d'Ivoire", id: "CI" },
  { title: "Cook Islands", id: "CK" },
  { title: "Chile", id: "CL" },
  { title: "Cameroon", id: "CM" },
  { title: "China", id: "CN" },
  { title: "Colombia", id: "CO" },
  { title: "Costa Rica", id: "CR" },
  { title: "Cuba", id: "CU" },
  { title: "Cape Verde", id: "CV" },
  { title: "Curaçao", id: "CW" },
  { title: "Christmas Island", id: "CX" },
  { title: "Cyprus", id: "CY" },
  { title: "Czech Republic", id: "CZ" },
  { title: "Germany", id: "DE" },
  { title: "Djibouti", id: "DJ" },
  { title: "Denmark", id: "DK" },
  { title: "Dominica", id: "DM" },
  { title: "Dominican Republic", id: "DO" },
  { title: "Algeria", id: "DZ" },
  { title: "Ecuador", id: "EC" },
  { title: "Egypt", id: "EG" },
  { title: "Estonia", id: "EE" },
  { title: "Western Sahara", id: "EH" },
  { title: "Eritrea", id: "ER" },
  { title: "Spain", id: "ES" },
  { title: "Ethiopia", id: "ET" },
  { title: "Finland", id: "FI" },
  { title: "Fiji", id: "FJ" },
  { title: "Falkland Islands", id: "FK" },
  { title: "Federated States of Micronesia", id: "FM" },
  { title: "Faroe Islands", id: "FO" },
  { title: "France", id: "FR" },
  { title: "Gabon", id: "GA" },
  { title: "United Kingdom", id: "GB" },
  { title: "Georgia", id: "GE" },
  { title: "Grenada", id: "GD" },
  { title: "French Guiana", id: "GF" },
  { title: "Guernsey", id: "GG" },
  { title: "Ghana", id: "GH" },
  { title: "Gibraltar", id: "GI" },
  { title: "Greenland", id: "GL" },
  { title: "Gambia", id: "GM" },
  { title: "Guinea", id: "GN" },
  { title: "Glorioso Islands", id: "GO" },
  { title: "Guadeloupe", id: "GP" },
  { title: "Equatorial Guinea", id: "GQ" },
  { title: "Greece", id: "GR" },
  { title: "South Georgia and South Sandwich Islands", id: "GS" },
  { title: "Guatemala", id: "GT" },
  { title: "Guam", id: "GU" },
  { title: "Guinea-Bissau", id: "GW" },
  { title: "Guyana", id: "GY" },
  { title: "Hong Kong", id: "HK" },
  { title: "Heard Island and McDonald Islands", id: "HM" },
  { title: "Honduras", id: "HN" },
  { title: "Croatia", id: "HR" },
  { title: "Haiti", id: "HT" },
  { title: "Hungary", id: "HU" },
  { title: "Indonesia", id: "ID" },
  { title: "Ireland", id: "IE" },
  { title: "Israel", id: "IL" },
  { title: "Isle of Man", id: "IM" },
  { title: "India", id: "IN" },
  { title: "British Indian Ocean Territory", id: "IO" },
  { title: "Iraq", id: "IQ" },
  { title: "Iran", id: "IR" },
  { title: "Iceland", id: "IS" },
  { title: "Italy", id: "IT" },
  { title: "Jersey", id: "JE" },
  { title: "Jamaica", id: "JM" },
  { title: "Jordan", id: "JO" },
  { title: "Japan", id: "JP" },
  { title: "Juan De Nova Island", id: "JU" },
  { title: "Kenya", id: "KE" },
  { title: "Kyrgyzstan", id: "KG" },
  { title: "Cambodia", id: "KH" },
  { title: "Kiribati", id: "KI" },
  { title: "Comoros", id: "KM" },
  { title: "Saint Kitts and Nevis", id: "KN" },
  { title: "North Korea", id: "KP" },
  { title: "South Korea", id: "KR" },
  { title: "Kosovo", id: "XK" },
  { title: "Kuwait", id: "KW" },
  { title: "Cayman Islands", id: "KY" },
  { title: "Kazakhstan", id: "KZ" },
  { title: "Lao People's Democratic Republic", id: "LA" },
  { title: "Lebanon", id: "LB" },
  { title: "Saint Lucia", id: "LC" },
  { title: "Liechtenstein", id: "LI" },
  { title: "Sri Lanka", id: "LK" },
  { title: "Liberia", id: "LR" },
  { title: "Lesotho", id: "LS" },
  { title: "Lithuania", id: "LT" },
  { title: "Luxembourg", id: "LU" },
  { title: "Latvia", id: "LV" },
  { title: "Libya", id: "LY" },
  { title: "Morocco", id: "MA" },
  { title: "Monaco", id: "MC" },
  { title: "Moldova", id: "MD" },
  { title: "Montenegro", id: "ME" },
  { title: "Saint Martin", id: "MF" },
  { title: "Madagascar", id: "MG" },
  { title: "Marshall Islands", id: "MH" },
  { title: "Macedonia", id: "MK" },
  { title: "Mali", id: "ML" },
  { title: "Myanmar", id: "MM" },
  { title: "Mongolia", id: "MN" },
  { title: "Macao", id: "MO" },
  { title: "Northern Mariana Islands", id: "MP" },
  { title: "Martinique", id: "MQ" },
  { title: "Mauritania", id: "MR" },
  { title: "Montserrat", id: "MS" },
  { title: "Malta", id: "MT" },
  { title: "Mauritius", id: "MU" },
  { title: "Maldives", id: "MV" },
  { title: "Malawi", id: "MW" },
  { title: "Mexico", id: "MX" },
  { title: "Malaysia", id: "MY" },
  { title: "Mozambique", id: "MZ" },
  { title: "Namibia", id: "NA" },
  { title: "New Caledonia", id: "NC" },
  { title: "Niger", id: "NE" },
  { title: "Norfolk Island", id: "NF" },
  { title: "Nigeria", id: "NG" },
  { title: "Nicaragua", id: "NI" },
  { title: "Niue", id: "NU" },
  { title: "Netherlands", id: "NL" },
  { title: "Norway", id: "NO" },
  { title: "Nepal", id: "NP" },
  { title: "Nauru", id: "NR" },
  { title: "New Zealand", id: "NZ" },
  { title: "Oman", id: "OM" },
  { title: "Panama", id: "PA" },
  { title: "Peru", id: "PE" },
  { title: "French Polynesia", id: "PF" },
  { title: "Papua New Guinea", id: "PG" },
  { title: "Philippines", id: "PH" },
  { title: "Pakistan", id: "PK" },
  { title: "Poland", id: "PL" },
  { title: "Saint Pierre and Miquelon", id: "PM" },
  { title: "Pitcairn Islands", id: "PN" },
  { title: "Puerto Rico", id: "PR" },
  { title: "Palestine", id: "PS" },
  { title: "Portugal", id: "PT" },
  { title: "Palau", id: "PW" },
  { title: "Paraguay", id: "PY" },
  { title: "Qatar", id: "QA" },
  { title: "Reunion", id: "RE" },
  { title: "Romania", id: "RO" },
  { title: "Serbia", id: "RS" },
  { title: "Russia", id: "RU" },
  { title: "Rwanda", id: "RW" },
  { title: "Saudi Arabia", id: "SA" },
  { title: "Solomon Islands", id: "SB" },
  { title: "Seychelles", id: "SC" },
  { title: "Sudan", id: "SD" },
  { title: "Sweden", id: "SE" },
  { title: "Singapore", id: "SG" },
  { title: "Saint Helena", id: "SH" },
  { title: "Slovenia", id: "SI" },
  { title: "Svalbard and Jan Mayen", id: "SJ" },
  { title: "Slovakia", id: "SK" },
  { title: "Sierra Leone", id: "SL" },
  { title: "San Marino", id: "SM" },
  { title: "Senegal", id: "SN" },
  { title: "Somalia", id: "SO" },
  { title: "Suriname", id: "SR" },
  { title: "South Sudan", id: "SS" },
  { title: "Sao Tome and Principe", id: "ST" },
  { title: "El Salvador", id: "SV" },
  { title: "Sint Maarten", id: "SX" },
  { title: "Syrian Arab Republic", id: "SY" },
  { title: "Swaziland", id: "SZ" },
  { title: "Sint Eustatius", id: "SZ" },
  { title: "Chad", id: "TD" },
  { title: "French Southern Territories", id: "TF" },
  { title: "Togo", id: "TG" },
  { title: "Thailand", id: "TH" },
  { title: "Tajikistan", id: "TJ" },
  { title: "Tokelau", id: "TK" },
  { title: "Timor-Leste", id: "TL" },
  { title: "Turkmenistan", id: "TM" },
  { title: "Tunisia", id: "TN" },
  { title: "Tonga", id: "TO" },
  { title: "Turkey", id: "TR" },
  { title: "Trinidad and Tobago", id: "TT" },
  { title: "Tuvalu", id: "TV" },
  { title: "Taiwan", id: "TW" },
  { title: "Tanzania", id: "TZ" },
  { title: "Ukraine", id: "UA" },
  { title: "Uganda", id: "UG" },
  { title: "United States of America", id: "US" },
  { title: "Uruguay", id: "UY" },
  { title: "Uzbekistan", id: "UZ" },
  { title: "Vanuatu", id: "VU" },
  { title: "Venezuela", id: "VE" },
  { title: "Vietnam", id: "VN" },
  { title: "Wallis and Futuna", id: "WF" },
  { title: "Samoa", id: "WS" },
  { title: "Yemen", id: "YE" },
  { title: "Mayotte", id: "YT" },
  { title: "South Africa", id: "ZA" },
  { title: "Zambia", id: "ZM" },
  { title: "Zimbabwe", id: "ZW" },
];

// eslint-disable-next-line react/display-name
const MySVG = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg ref={ref} {...props}>
      <AustraliaSVG />
    </svg>
  ),
);

const WorldMap = () => {
  const svgRef = useRef<SVGSVGElement | null>(null); // Create a reference to the SVG element
  const [selectedID, setSelectedID] = useState<string | null>(null);
  const { theme } = useTheme();

  const bgColour = isDark(theme) ? "bg-blue-800" : "bg-blue-200";
  const landColour = isDark(theme) ? "fill-orange-950" : "fill-orange-200";
  const borderColour = isDark(theme) ? "stroke-orange-800" : "stroke-black";

  // Set colour of all paths by default
  useEffect(() => {
    if (svgRef.current) {
      const paths = svgRef.current.querySelectorAll<SVGPathElement>("path"); // Get all path elements
      paths.forEach((path) => {
        path.classList.remove(
          "fill-orange-950",
          "fill-orange-200",
          "stroke-orange-800",
          "stroke-black",
        );
        path.classList.add(
          landColour,
          borderColour,
          "transition-all",
          "transform",
          "origin-center",
          "hover:fill-red-500",
          "duration-200",
          "ease-in-out",
          "transform-fill-box",
        );

        // Create a rectangle around each path
        const bbox = path.getBBox(); // Get the bounding box of the path
        const rect = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "rect",
        );
        rect.setAttribute("x", `${bbox.x - 2}`); // Add padding to the left
        rect.setAttribute("y", `${bbox.y - 2}`); // Add padding to the top
        rect.setAttribute("width", `${bbox.width + 4}`); // Add padding to the right
        rect.setAttribute("height", `${bbox.height + 4}`); // Add padding to the bottom
        rect.setAttribute("fill", "none");
        rect.setAttribute("stroke", "yellow");
        rect.setAttribute("stroke-width", "2");
        rect.classList.add("hidden");

        path.parentNode?.insertBefore(rect, path); // Insert the rectangle before the path

        // On hover, show the rectangle (box around the path)
        path.addEventListener("mouseenter", () => {
          rect.setAttribute("class", "block"); // Show the rectangle on hover
          path.parentNode?.appendChild(rect); // Move hovered element to the end so it appears on top
        });

        // On mouse leave, hide the rectangle again
        path.addEventListener("mouseleave", () => {
          rect.setAttribute("class", "hidden"); // Hide the rectangle
        });

        // Move hovered element to the end so it appears on top
        path.addEventListener("mouseenter", () => {
          // path.parentNode?.appendChild(path); // Move hovered element to the end so it appears on top
          setSelectedID(path.id);
        });
      });
    }
  }, [theme]);

  // Event handler for path click
  const handleStateClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const target = e.target as SVGPathElement; // Cast the event target to an SVG path element

    // Ensure the target is an SVG path
    target.style.fill = "green"; // Change the fill color of the clicked path
    target.style.stroke = "black"; // Change the stroke color of the clicked path
  };

  return (
    <div className="min-h-screen">
      <Navbar fixed={true} />
      <h1 className="pt-20 text-center">World Map</h1>

      <div className={clsx("flex w-screen justify-center p-2", bgColour)}>
        <MySVG
          ref={svgRef}
          onClick={handleStateClick}
          className="h-72 w-full sm:h-96 md:h-[40rem] lg:h-[40rem] xl:h-[50rem] 2xl:h-[60rem]"
        />
      </div>
      <h2>Country: {countries.find((c) => c.id == selectedID)?.title}</h2>
    </div>
  );
};

export default WorldMap;
