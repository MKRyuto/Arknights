$(document).ready(function () {
  $("#search-input").val("");

  $.getJSON("../public/json/getDataB6.json", function (jsonData) {
    let selectedValue = "ALL";
    let inputSearch = null;
    var filteredData;
    // Show all data by default
    showData(jsonData);

    // Add click event listener to the export button
    $("#export-button").click(function () {
      exportExcel(jsonData);
    });

    $(".profession").click(function () {
      // Get the selected value of the dropdown select
      selectedValue = $(this).find("a").attr("href").substring(1);
      // Filter the data based on the selected value
      var filteredData = jsonData.filter(function (item) {
        if (inputSearch == null) {
          return selectedValue === "ALL" || item.profession === selectedValue;
        } else {
          return (
            (selectedValue === "ALL" &&
              item.en_name.toLowerCase().includes(inputSearch)) ||
            (item.profession === selectedValue &&
              item.en_name.toLowerCase().includes(inputSearch))
          );
        }
      });
      // Show the filtered data
      showData(filteredData);
    });

    $("#search-input").on("input", function () {
      inputSearch = $(this).val().toLowerCase();
      filteredData = jsonData.filter(function (item) {
        if (selectedValue == "ALL") {
          return item.en_name.toLowerCase().includes(inputSearch);
        } else {
          return (
            item.en_name.toLowerCase().includes(inputSearch) &&
            item.profession === selectedValue
          );
        }
      });

      // Show the filtered data
      showData(filteredData);
    });

    $("#clear-input").click(function () {
      $("#search-input").val("");
      inputSearch = null;
      console.log(selectedValue);
      if (selectedValue == "ALL") {
        showData(jsonData);
      } else {
        filteredData = jsonData.filter(function (item) {
          return item.profession === selectedValue;
        });
        showData(filteredData);
      }
    });
  });

  $(".border-profession").click(function () {
    $(".border-profession").removeClass("active");
    $(this).addClass("active");
  });

  // Function to show the data
  function showData(data) {
    $("#char-info").empty();
    $.each(data, function (index, item) {
      var element = `
              <div class="container">
                  <div class="section-top-border">
                  <div class="container mt-5 mb-5">
                      <div class="row no-gutters">
                      <div class="col-md-3 col-lg-3 image-card">
                        <div style="background: rgba(0, 0, 0, 0.8)">
                          <img
                          src="../public/arknights/${item.image}"
                          style="width: 100%; height: 100%; object-fit:cover;"
                          />
                      </div>
                      </div>
                      <div class="col-md-9 col-lg-9">
                          <div class="d-flex flex-column">
                              <div class="text-center p-3 bg-warning">
                                  <h3 class="display-5 text-white">${item.cn_name} (${item.en_name})</h3>
                              </div>
                              <div class="text-center pt-4 bg-black text-white">
                                  <h6>Total Sample : ${item.number_sample}</h6>
                              </div>
                              <div class="d-flex flex-row">
                                  <div class="p-3 pt-3 bg-light text-center skill-block">
                                      <h4>${item.holding_rate} %</h4>
                                      <h6 style="color:#ffc107 ;!important">Ownership</h6>
                                  </div>
                                  <div class="p-3 bg-warning text-center skill-block">
                                      <h4>${item.non_elite} %</h4>
                                      <h6>Non Elite</h6>
                                  </div>
                                  <div class="p-3 bg-light text-center skill-block">
                                      <h4>${item.elite_one} %</h4>
                                      <h6 style="color:#ffc107 ;!important">Elite 1</h6>
                                  </div>
                                  <div class="p-3 bg-warning text-center skill-block">
                                      <h4>${item.elite_two} %</h4>
                                      <h6>Elite 2</h6>
                                  </div>
                              </div>
                          </div>
                      </div>
                      </div>
                      <div class="border-bottom-card">
                      <div class="progress-table-wrap">
                      <div class="progress-table">
                          <div class="table-head">
                              <div class="image-table-char">Image</div>
                              <div class="cn-name-table-char">CN Name</div>
                              <div class="en-name-table-char">EN Name</div>
                              <div class="percentage">Percentages</div>
                          </div>
                          `;
      $.each(item.skills, function (index, skill) {
        element =
          element +
          `  
                          <div class="table-row">
                              <div class="image-table-char">
                                <div class="d-flex flex-column align-items-center">
                                  <img class="mx-auto" src="../public/arknights/${skill.image}" alt="skill_${skill.type}" height="50px">
                                  <span class="mt-1">Skill ${skill.type}</span>
                                </div>
                              </div>
                              <div class="cn-name-table-char">${skill.cn_name}</div>
                              <div class="en-name-table-char">${skill.en_name}</div>
                              <div class="percentage">
                                <div class="d-flex flex-column align-items-center w-100">
                                    <div class="progress w-100">
                                        <div class="progress-bar color-1" style="opacity:0.1;width:${skill.unspecialized}%"></div>
                                        <div class="progress-bar color-1" style="opacity:0.4;width:${skill.specialization_one}%"></div>
                                        <div class="progress-bar color-1" style="opacity:0.7;width:${skill.specialization_two}%"></div>
                                        <div class="progress-bar color-1" style="opacity:1;width:${skill.specialization_three}%"></div>
                                    </div>
                                      <div class="text-center d-flex align-items-center w-100" style="font-size:0.7em;overflow:auto">
                                      <div class="mx-1" style="min-width:fit-content;width:${skill.unspecialized}%">
                                        Unspecialized
                                        <br>
                                        ${skill.unspecialized}%
                                      </div>
                                      <div class="mx-1" style="min-width:fit-content;width:${skill.specialization_one}%">
                                        Mastery 1
                                        <br>
                                        ${skill.specialization_one}%
                                      </div>
                                      <div class="mx-1" style="min-width:fit-content;width:${skill.specialization_two}%">
                                        Mastery 2
                                        <br>
                                        ${skill.specialization_two}%
                                      </div><div class="mx-1" style="min-width:fit-content;width:${skill.specialization_three}%">
                                        Mastery 3
                                        <br>
                                        ${skill.specialization_three}%
                                      </div>
                                    </div>
                                </div>
                              </div>
                          </div>
                          `;
      });

      $.each(item.modules, function (index, module) {
        element =
          element +
          `  
                          <div class="table-row">
                              <div class="image-table-char">
                                <div class="d-flex flex-column align-items-center">
                                  <img class="mx-auto" src="../public/arknights/${module.image}" alt="module_${module.type}" height="50px">
                                  <span class="mt-1">Module ${module.type}</span>
                                </div>
                              </div>
                              <div class="cn-name-table-char">${module.cn_name}</div>
                              <div class="en-name-table-char">${module.en_name}</div>
                              <div class="percentage">
                                <div class="d-flex flex-column align-items-center w-100">
                                    <div class="progress w-100">
                                        <div class="progress-bar color-3" style="opacity:0.1;width:${module.unlocked}%"></div>
                                        <div class="progress-bar color-3" style="opacity:0.4;width:${module.level_one}%"></div>
                                        <div class="progress-bar color-3" style="opacity:0.7;width:${module.level_two}%"></div>
                                        <div class="progress-bar color-3" style="opacity:1;width:${module.level_three}%"></div>
                                    </div>
                                      <div class="text-center d-flex align-items-center w-100" style="font-size:0.7em;overflow:auto">
                                      <div class="mx-1" style="min-width:fit-content;width:${module.unlocked}%">
                                        Unlocked
                                        <br>
                                        ${module.unlocked}%
                                      </div>
                                      <div class="mx-1" style="min-width:fit-content;width:${module.level_one}%">
                                        Level 1
                                        <br>
                                        ${module.level_one}%
                                      </div>
                                      <div class="mx-1" style="min-width:fit-content;width:${module.level_two}%">
                                        Level 2
                                        <br>
                                        ${module.level_two}%
                                      </div><div class="mx-1" style="min-width:fit-content;width:${module.level_three}%">
                                        Level 3
                                        <br>
                                        ${module.level_three}%
                                      </div>
                                    </div>
                                </div>
                              </div>
                          </div>
                          `;
      });

      element =
        element +
        `
                      </div>
                      </div>
                      </div>
                  </div>
                  </div>
              </div>
              `;

      $("#char-info").append(element);
    });
  }

  // Function to export data
  function exportExcel(data) {
    var jsonDataExcel = [];
    var module_x, module_y;
    // Export the JSON data to Excel
    var myFile = `RaitoDataSurvey-${moment().format("Y-M-D")}.xlsx`;

    $.each(data, function (index, item) {
      if (item.modules.length == 0) {
        module_x = "-";
        module_y = "-";
      } else {
        if (item.modules.length == 1) {
          if (item.modules[0].type == "X") {
            module_x = `${item.modules[0].level_three}%`;
            module_y = module_x = "-";
          } else {
            module_x = module_x = "-";
            module_y = `${item.modules[0].level_three}%`;
          }
        } else {
          module_x = `${item.modules[0].level_three}%`;
          module_y = `${item.modules[1].level_three}%`;
        }
      }

      jsonItem = {
        profession: item.profession,
        cn_name: item.cn_name,
        en_name: item.en_name,
        number_sample: item.number_sample,
        ownership: `${item.holding_rate}%`,
        elite_two: `${item.elite_two}%`,
        s1m3: `${item.skills[0].specialization_three}%`,
        s2m3: `${item.skills[1].specialization_three}%`,
        s3m3: `${item.skills[2].specialization_three}%`,
        module_x_3: module_x,
        module_y_3: module_y,
      };
      jsonDataExcel.push(jsonItem);
    });

    if (jsonDataExcel.length > 0) {
      var myWorkSheet = XLSX.utils.json_to_sheet(jsonDataExcel);
      var headerStyle = {
        font: { bold: true },
        alignment: { horizontal: "center", vertical: "center" },
      };

      XLSX.utils.sheet_add_aoa(
        myWorkSheet,
        [
          [
            { v: "Profession", s: headerStyle },
            { v: "CN Name", s: headerStyle },
            { v: "EN Name", s: headerStyle },
            { v: "Sample Number", s: headerStyle },
            { v: "Ownership", s: headerStyle },
            { v: "Elite 2", s: headerStyle },
            { v: "Skill Mastery 3", s: headerStyle },
            { v: "", s: headerStyle },
            { v: "", s: headerStyle },
            { v: "Module Level 3", s: headerStyle },
            { v: "", s: headerStyle },
          ],
          [
            "",
            "",
            "",
            "",
            "",
            "",
            "Skill 1",
            "Skill 2",
            "Skill 3",
            "Module X",
            "Module Y",
          ],
        ],
        {
          origin: 0,
        }
      );

      // Merge
      var merges = (myWorkSheet["!merges"] = [
        { s: "A1", e: "A2" },
        { s: "B1", e: "B2" },
        { s: "C1", e: "C2" },
        { s: "D1", e: "D2" },
        { s: "E1", e: "E2" },
        { s: "F1", e: "F2" },
        { s: "G1", e: "I1" },
        { s: "J1", e: "K1" },
      ]);

      // Set the width of each column
      myWorkSheet["!cols"] = [
        { width: 12 },
        { width: 20 },
        { width: 20 },
        { width: 15 },
        { width: 12 },
        { width: 10 },
        { width: 10 },
        { width: 10 },
        { width: 10 },
        { width: 10 },
        { width: 10 },
      ];

      var myWorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(myWorkBook, myWorkSheet, "Data Survey");
      XLSX.writeFile(myWorkBook, myFile);
    }
  }
});
