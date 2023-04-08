$(document).ready(function () {
  $.getJSON("../public/json/getDataB6.json", function (data) {
    var jsonData = data;
    // Show all data by default
    showData(jsonData);

    $(".profession").click(function () {
      // Get the selected value of the dropdown select
      var selectedValue = $(this).find("a").attr("href").substring(1);
      // Filter the data based on the selected value
      var filteredData = jsonData.filter(function (item) {
        return selectedValue === "ALL" || item.profession === selectedValue;
      });
      // Show the filtered data
      showData(filteredData);
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
});
