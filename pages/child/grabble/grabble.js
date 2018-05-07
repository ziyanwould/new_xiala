// pages/child/grabble/grabble.js
var url = "http://www.imooc.com/course/ajaxlist";
var page = 0;
var page_size = 5;
var sort = "last";
var is_easy = 0;
var lange_id = 0;
var pos_id = 0;
var unlearn = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [

    ],
    historys: [
      { count:"建造师"},
      { count: "一级建造师" },
      { count: "五大员" },
      { count: "建筑师" },
      { count: "设计师" },
      { count: "中住七一网络科技有限公司" },
    ],
    enjoy: [
      { name: "建造师" },
      { name: "前端开发工程师" },
      { name: ".net后端工程师" },
      { name: "UI设计师" },
      { name: "SEO工程师" },
      { name: "开发产品经理" },
    ],
    activeIndex: -1,
    used_list: [
      { title: "分类01", name: "用证地址" },
      { title: "分类02", name: "证书类别" }
  
    ],
    used_lists: [
      { title: "分类01", name: "公司地址" },
      { title: "分类02", name: "职位类别" }

    ],
    searchList:[
      { name: "造价师" },
      { name: "广东省独资公司" },
      { name: "价格" },
      { name: "其他" },
      { name: "其他2" },
    ], 
    positions:[
      { count:"一级建造师" ,types:false,other:""},
      { count: "房建专业", types: true, other: "一级建造师" },
      { count: "机电专业", types: true, other: "一级建造师" },
      { count: "公路专业", types: true, other: "一级建造师" },
      { count: "市政专业", types: true, other: "一级建造师" },
      { count: "港口与航道专业", types: true, other: "一级建造师" },
      { count: "水利水电专业", types: true, other: "一级建造师" },

      { count: "矿业专业", types: true, other: "一级建造师" },
      { count: "铁路专业", types: true, other: "一级建造师" },
      { count: "通信与广电专业", types: true, other: "一级建造师" },
      { count: "民航专业", types: true, other: "一级建造师" },

      { count: "二级建造师", types: false, other: "" },
      { count: "房建专业", types: true, other: "二级建造师" },
      { count: "机电专业", types: true, other: "二级建造师" },
      { count: "市政专业", types: true, other: "二级建造师" },
      { count: "公路专业", types: true, other: "二级建造师" },
      { count: "水利水电专业", types: true, other: "二级建造师" },
      { count: "矿业专业", types: true, other: "二级建造师" },

      { count: "公用设备工程师", types: false, other: "" },
      { count: "注册给排水", types: true, other: "公用设备工程师" },
      { count: "注册暖通", types: true, other: "公用设备工程师" },
      { count: "注册动力", types: true, other: "公用设备工程师" },

      { count: "电气工程师", types: false, other: "" },
      { count: "注册供配电", types: true, other: "电气工程师" },
      { count: "注册发输电", types: true, other: "电气工程师" },

      { count: "土木工程师", types: false, other: "" },
      { count: "注册岩土", types: true, other: "土木工程师" },
      { count: "注册水利水电", types: true, other: "土木工程师" },

      { count: "注册结构师", types: false, other: "" },
      { count: "注册一级", types: true, other: "注册结构师" },
      { count: "注册二级", types: true, other: "注册结构师" },

      { count: "注册建筑师", types: false, other: "" },
      { count: "注册一级", types: true, other: "注册建筑师" },
      { count: "注册二级", types: true, other: "注册建筑师" },

      { count: "造价工程师", types: false, other: "" },
      { count: "建设部", types: true, other: "造价工程师" },
      { count: "水利部", types: true, other: "造价工程师" },
      { count: "交通部", types: true, other: "造价工程师" },

      { count: "监理工程师", types: false, other: "" },
      { count: "建设部", types: true, other: "监理工程师" },
      { count: "水利部", types: true, other: "监理工程师" },
      { count: "交通部", types: true, other: "监理工程师" },

      { count: "注册城市规划师", types: false, other: "" },
      { count: "注册城市规划师建设部", types: true, other: "注册城市规划师" },

      { count: "注册化工工程师", types: false, other: "" },
      { count: "注册化工工程师", types: true, other: "注册化工工程师" },

      { count: "注册环评工程师", types: false, other: "" },
      { count: "注册环评工程师", types: true, other: "注册环评工程师" },

      { count: "注册环保工程师", types: false, other: "" },
      { count: "注册环保工程师", types: true, other: "注册环保工程师" },

      { count: "注册安全评价师", types: false, other: "" },
      { count: "注册一级", types: true, other: "注册环保工程师" },
      { count: "注册二级", types: true, other: "注册环保工程师" },
      { count: "注册三级", types: true, other: "注册环保工程师" },

      { count: "注册消防工程师", types: false, other: "" },
      { count: "注册消防工程师", types: true, other: "注册消防工程师" },

      { count: "注册会计工程师", types: false, other: "" },
      { count: "注册会计工程师", types: true, other: "注册会计工程师" },

      { count: "招标师", types: false, other: "" },
      { count: "招标师", types: true, other: "招标师" },

      { count: "土地估价师", types: false, other: "" },
      { count: "土地估价师招标师", types: true, other: "土地估价师" },

      { count: "房地产估价师", types: false, other: "" },
      { count: "房地产估价师", types: true, other: "房地产估价师" },

      { count: "资产评估师", types: false, other: "" },
      { count: "资产评估师", types: true, other: "资产评估师" },

      { count: "注册安全工程师", types: false, other: "" },
      { count: "注册安全工程师", types: true, other: "注册安全工程师" },

      { count: "高级工程师", types: false, other: "" },
      { count: "高级经济师", types: true, other: "高级工程师" },
      { count: "工民建高工", types: true, other: "高级工程师" },
      { count: "给排水高工", types: true, other: "高级工程师" },
      { count: "暖通高工", types: true, other: "高级工程师" },
      { count: "环保高工", types: true, other: "高级工程师" },
      { count: "化工高工", types: true, other: "高级工程师" },
      { count: "机械高工", types: true, other: "高级工程师" },
      { count: "计算机高工", types: true, other: "高级工程师" },
      { count: "通信高工", types: true, other: "高级工程师" },
      { count: "测量高工", types: true, other: "高级工程师" },
      { count: "测绘高工", types: true, other: "高级工程师" },
      { count: "概预算高工", types: true, other: "高级工程师" },
      { count: "园林高工", types: true, other: "高级工程师" },
      { count: "岩土高工", types: true, other: "高级工程师" },
      { count: "地质高工", types: true, other: "高级工程师" },
      { count: "结构高工", types: true, other: "高级工程师" },
      { count: "规划高工", types: true, other: "高级工程师" },
      { count: "建筑学高工", types: true, other: "高级工程师" },
      { count: "总图高工", types: true, other: "高级工程师" },
      { count: "爆破工程师", types: true, other: "高级工程师" },
      { count: "通信高工", types: true, other: "高级工程师" },
      { count: "防护高工", types: true, other: "高级工程师" },
      { count: "防化高工", types: true, other: "高级工程师" },
      { count: "其他", types: true, other: "高级工程师" },

      { count: "中级工程师", types: false, other: "" },
      { count: "中级经济师", types: true, other: "中级工程师" },
      { count: "工民建中工", types: true, other: "中级工程师" },
      { count: "电气中工", types: true, other: "中级工程师" },
      { count: "给排水中工", types: true, other: "中级工程师" },
      { count: "暖通中工", types: true, other: "中级工程师" },
      { count: "环保中工", types: true, other: "中级工程师" },
      { count: "化工中工", types: true, other: "中级工程师" },
      { count: "机械中工", types: true, other: "中级工程师" },
      { count: "计算机中工", types: true, other: "中级工程师" },
      { count: "通信中工", types: true, other: "中级工程师" },
      { count: "测量中工", types: true, other: "中级工程师" },
      { count: "测绘中工", types: true, other: "中级工程师" },
      { count: "概预算中工", types: true, other: "中级工程师" },
      { count: "园林中工", types: true, other: "中级工程师" },
      { count: "岩土中工", types: true, other: "中级工程师" },
      { count: "地质中工", types: true, other: "中级工程师" },
      { count: "结构中工", types: true, other: "中级工程师" },
      { count: "规划中工", types: true, other: "中级工程师" },
      { count: "建筑学中工", types: true, other: "中级工程师" },
      { count: "爆破工程师", types: true, other: "中级工程师" },
      { count: "通信中工", types: true, other: "中级工程师" },
      { count: "防护中工", types: true, other: "中级工程师" },
      { count: "防化中工", types: true, other: "中级工程师" },
      { count: "市政中工", types: true, other: "中级工程师" },
      { count: "其他", types: true, other: "中级工程师" },

      { count: "初级工程师", types: false, other: "" },
      { count: "初级经济师", types: true, other: "初级工程师" },
      { count: "工民建初工", types: true, other: "初级工程师" },
      { count: "电气初工", types: true, other: "初级工程师" },
      { count: "给排水初工", types: true, other: "初级工程师" },
      { count: "暖通初工", types: true, other: "初级工程师" },
      { count: "环保初工", types: true, other: "初级工程师" },
      { count: "化工初工", types: true, other: "初级工程师" },
      { count: "机械初工", types: true, other: "初级工程师" },
      { count: "计算机初工", types: true, other: "初级工程师" },
      { count: "通信初工", types: true, other: "初级工程师" },
      { count: "测量初工", types: true, other: "初级工程师" },
      { count: "测绘初工", types: true, other: "初级工程师" },
      { count: "概预算初工", types: true, other: "初级工程师" },
      { count: "园林初工", types: true, other: "初级工程师" },
      { count: "岩土初工", types: true, other: "初级工程师" },
      { count: "地质初工", types: true, other: "初级工程师" },
      { count: "结构初工", types: true, other: "初级工程师" },
      { count: "规划初工", types: true, other: "初级工程师" },
      { count: "建筑学初工", types: true, other: "初级工程师" },
      { count: "爆破工程师", types: true, other: "初级工程师" },
      { count: "通信初工", types: true, other: "初级工程师" },
      { count: "防护初工", types: true, other: "初级工程师" },
      { count: "防化初工", types: true, other: "初级工程师" },
      { count: "市政中工", types: true, other: "初级工程师" },
      { count: "其他", types: true, other: "初级工程师" },

      { count: "安全员", types: false, other: "" },
      { count: "A证", types: true, other: "安全员" },
      { count: "B证", types: true, other: "安全员" },
      { count: "C证", types: true, other: "安全员" },

      { count: "现场管理员（八大员）", types: false, other: "" },
      { count: "现场管理员（八大员）", types: true, other: "现场管理员（八大员）" },

      { count: "其他", types: false, other: "" },
      { count: "其他", types: true, other: "其他" },
 
 
  
    ],
    Position: [
      { count: "建筑/施工/安装", types: false, other: "" },
      { count: "建造师", types: true, other: "建筑/施工/安装" },
      { count: "建筑工程师", types: true, other: "建筑/施工/安装" },
      { count: "资料员", types: true, other: "建筑/施工/安装" },
      { count: "施工员", types: true, other: "建筑/施工/安装" },
      { count: "材料员", types: true, other: "建筑/施工/安装" },
      { count: "生产经理", types: true, other: "建筑/施工/安装" },
      { count: "建模人员", types: true, other: "建筑/施工/安装" },
      { count: "质检员", types: true, other: "建筑/施工/安装" },
      { count: "工长", types: true, other: "建筑/施工/安装" },
      { count: "安装/水电工程师", types: true, other: "建筑/施工/安装" },
      { count: "项目经理", types: true, other: "建筑/施工/安装" },
      { count: "项目工程师", types: true, other: "建筑/施工/安装" },
      { count: "土建工程师", types: true, other: "建筑/施工/安装" },
      { count: "现场", types: true, other: "建筑/施工/安装" },
      { count: "取样员", types: true, other: "建筑/施工/安装" },
      { count: "钢筋翻样", types: true, other: "建筑/施工/安装" },
      { count: "桩基工程师", types: true, other: "建筑/施工/安装" },
      { count: "加固工程师", types: true, other: "建筑/施工/安装" },
      { count: "安装工程师", types: true, other: "建筑/施工/安装" },
      { count: "空调工程师", types: true, other: "建筑/施工/安装" },
      { count: "管道工程师", types: true, other: "建筑/施工/安装" },
      { count: "防腐保温", types: true, other: "建筑/施工/安装" },
      { count: "制冷工程师", types: true, other: "建筑/施工/安装" },
      { count: "市政工程师", types: true, other: "建筑/施工/安装" },
      { count: "钢结构设计师", types: true, other: "建筑/施工/安装" },
      { count: "钢结构工程师", types: true, other: "建筑/施工/安装" },

      { count: "房地产/中介/物业", types: false, other: "" },
      { count: "房地产开发/策划", types: true, other: "房地产/中介/物业" },
      { count: "房地产估价师", types: true, other: "房地产/中介/物业" },
      { count: "前期开发类", types: true, other: "房地产/中介/物业" },
      { count: "前期开发部总监/经理/主管", types: true, other: "房地产/中介/物业" },
      { count: "报批报建经理/主管", types: true, other: "房地产/中介/物业" },
      { count: "招聘经理/主管", types: true, other: "房地产/中介/物业" },
      { count: "报建员", types: true, other: "房地产/中介/物业" },
      { count: "注册咨询工程师", types: true, other: "房地产/中介/物业" },
      { count: "物业经理/主任/主管", types: true, other: "房地产/中介/物业" },

      { count: "测绘/水文/勘探/矿井", types: false, other: "" },
      { count: "测绘工程师", types: true, other: "测绘/水文/勘探/矿井" },
      { count: "测量组长", types: true, other: "测绘/水文/勘探/矿井" },
      { count: "测量员/技工", types: true, other: "测绘/水文/勘探/矿井" },
      { count: "测绘内业/制图", types: true, other: "测绘/水文/勘探/矿井" },
      { count: "航测遥感", types: true, other: "测绘/水文/勘探/矿井" },
      { count: "GIS/GPS软件工程师", types: true, other: "测绘/水文/勘探/矿井" },
      { count: "数据处理", types: true, other: "测绘/水文/勘探/矿井" },
      { count: "水文地质工程", types: true, other: "测绘/水文/勘探/矿井" },
      { count: "岩土工程师", types: true, other: "测绘/水文/勘探/矿井" },
      { count: "钻井工程师", types: true, other: "测绘/水文/勘探/矿井" },
      { count: "司钻/副司钻", types: true, other: "测绘/水文/勘探/矿井" },
      { count: "采矿工程师/技术员", types: true, other: "测绘/水文/勘探/矿井" },
      { count: "测量工程师", types: true, other: "测绘/水文/勘探/矿井" },

      { count: "建筑设计类", types: false, other: "" },
      { count: "总建筑师/高级建筑师", types: true, other: "建筑设计类" },
      { count: "审图工程师", types: true, other: "建筑设计类" },
      { count: "规划师", types: true, other: "建筑设计类" },
      { count: "建筑师/建筑设计师", types: true, other: "建筑设计类" },
      { count: "结构工程师", types: true, other: "建筑设计类" },
      { count: "暖通工程师", types: true, other: "建筑设计类" },
      { count: "电气工程师", types: true, other: "建筑设计类" },
      { count: "设备工程师", types: true, other: "建筑设计类" },
      { count: "效果图制作/建筑制图", types: true, other: "建筑设计类" },
      { count: "给排水工程师", types: true, other: "建筑设计类" },
      { count: "水利/水电类", types: true, other: "建筑设计类" },
      { count: "建模人员", types: true, other: "建筑设计类" },
      { count: "BIM工程师", types: true, other: "建筑设计类" },

      { count: "环保工程类", types: false, other: "" },
      { count: "环保工程师/技术员", types: true, other: "环保工程类" },
      { count: "环评工程师/技术员", types: true, other: "环保工程类" },
      { count: "给排水工程师", types: true, other: "环保工程类" },
      { count: "循环冷却水处理", types: true, other: "环保工程类" },
      { count: "固废/垃圾处理", types: true, other: "环保工程类" },
      { count: "废水/污水处理", types: true, other: "环保工程类" },
      { count: "废气治理", types: true, other: "环保工程类" },
      { count: "烟气脱硫工艺", types: true, other: "环保工程类" },
      { count: "水质分析/化验", types: true, other: "环保工程类" },
      { count: "环境在线监测", types: true, other: "环保工程类" },
      { count: "水处理工程师", types: true, other: "环保工程类" },
      { count: "电厂化学/水处理", types: true, other: "环保工程类" },
      { count: "净水/纯水处理", types: true, other: "环保工程类" },
      { count: "脱硫除尘工程师", types: true, other: "环保工程类" },
      { count: "防腐保温", types: true, other: "环保工程类" },
      { count: "脱硫工艺工程师", types: true, other: "环保工程类" },

      { count: "矿产/地质/钢铁/冶金类", types: false, other: "" },
      { count: "矿长/副矿长", types: true, other: "矿产/地质/钢铁/冶金类" },
      { count: "冶金工程师", types: true, other: "矿产/地质/钢铁/冶金类" },
      { count: "地质工程师", types: true, other: "矿产/地质/钢铁/冶金类" },
      { count: "冶炼工程师", types: true, other: "矿产/地质/钢铁/冶金类" },
      { count: "炼钢工程师", types: true, other: "矿产/地质/钢铁/冶金类" },
      { count: "熔铸工程师", types: true, other: "矿产/地质/钢铁/冶金类" },
      { count: "采矿工程师/技术员", types: true, other: "矿产/地质/钢铁/冶金类" },
      { count: "选矿工程师/技术员", types: true, other: "矿产/地质/钢铁/冶金类" },
      { count: "通风工程师/技术员", types: true, other: "矿产/地质/钢铁/冶金类" },
      { count: "氧化工程师/技术员", types: true, other: "矿产/地质/钢铁/冶金类" },
      { count: "电解工程师/技术员", types: true, other: "矿产/地质/钢铁/冶金类" },
      { count: "矿建/井建工程师", types: true, other: "矿产/地质/钢铁/冶金类" },
      { count: "矿权评估", types: true, other: "矿产/地质/钢铁/冶金类" },
      { count: "矿物分析/化验", types: true, other: "矿产/地质/钢铁/冶金类" },
      { count: "金属材料/压力加工", types: true, other: "矿产/地质/钢铁/冶金类" },

      { count: "水利/水电类", types: false, other: "" },
      { count: "水利工程师", types: true, other: "水利/水电类" },
      { count: "水利水电设计", types: true, other: "水利/水电类" },
      { count: "水力设计", types: true, other: "水利/水电类" },
      { count: "水电站运维", types: true, other: "水利/水电类" },
      { count: "电站管理工程师", types: true, other: "水利/水电类" },
      { count: "水土保持监测", types: true, other: "水利/水电类" },
      { count: "水文水资源", types: true, other: "水利/水电类" },
      { count: "水保工程师", types: true, other: "水利/水电类" },
      { count: "农田水利工程师", types: true, other: "水利/水电类" },
      { count: "土地复垦", types: true, other: "水利/水电类" },
      { count: "堤破防护", types: true, other: "水利/水电类" },
      { count: "灌溉工程师", types: true, other: "水利/水电类" },
      { count: "水工设计师", types: true, other: "水利/水电类" },
      { count: "水工工程师", types: true, other: "水利/水电类" },
      { count: "土地整理及规划", types: true, other: "水利/水电类" },
      { count: "水保方案编制工程师", types: true, other: "水利/水电类" },
      { count: "水轮发电机", types: true, other: "水利/水电类" },

      { count: "电气/自动化类", types: false, other: "" },
      { count: "电气工程师/技术员", types: true, other: "电气/自动化类" },
      { count: "自动化仪表工程师", types: true, other: "电气/自动化类" },
      { count: "自动控制工程师/技术员", types: true, other: "电气/自动化类" },
      { count: "断路器工程师/技术员", types: true, other: "电气/自动化类" },
      { count: "开关电源工程师", types: true, other: "电气/自动化类" },
      { count: "电控工程师/技术员", types: true, other: "电气/自动化类" },
      { count: "变压/变频工程师", types: true, other: "电气/自动化类" },
      { count: "节能工程师/技术员", types: true, other: "电气/自动化类" },
      { count: "成套设计工程师/技术员", types: true, other: "电气/自动化类" },
      { count: "防雷工程师/技术员", types: true, other: "电气/自动化类" },
      { count: "传感器工程师/技术员", types: true, other: "电气/自动化类" },
      { count: "互感工程师/技术员", types: true, other: "电气/自动化类" },
      { count: "继保工程师/技术员", types: true, other: "电气/自动化类" },
      { count: "工控工程师", types: true, other: "电气/自动化类" },
      { count: "电子工程师/技术员", types: true, other: "电气/自动化类" },
      { count: "电抗器工程师", types: true, other: "电气/自动化类" },
      { count: "高压开关研发/设计", types: true, other: "电气/自动化类" },

      { count: "人力资源类", types: false, other: "" },
      { count: "人力资源总裁/副总监/总监", types: true, other: "人力资源类" },
      { count: "人力资源经理/主管/专员", types: true, other: "人力资源类" },
      { count: "人事经理/专员/助理", types: true, other: "人力资源类" },
      { count: "招聘经理/主管/专员", types: true, other: "人力资源类" },
      { count: "培训经理/主管/专员", types: true, other: "人力资源类" },
      { count: "企业文化经理/主管/专员", types: true, other: "人力资源类" },
      { count: "薪酬福利经理/主管/专员", types: true, other: "人力资源类" },
      { count: "绩效考核经理/主管/专员", types: true, other: "人力资源类" },
      { count: "员工关系/工会管理", types: true, other: "人力资源类" },
      { count: "咨询师", types: true, other: "人力资源类" },
      { count: "其他人力资源类", types: true, other: "人力资源类" },

      { count: "注册城市规划师", types: false, other: "" },
      { count: "行政总监", types: true, other: "注册城市规划师" },
      { count: "行政经理/主管/办公室主任", types: true, other: "注册城市规划师" },
      { count: "前台/文员/接待/秘书", types: true, other: "注册城市规划师" },
      { count: "图书情报/资料/文档管理", types: true, other: "注册城市规划师" },
      { count: "电脑操作员/打字员/校队", types: true, other: "注册城市规划师" },
      { count: "后勤/安保/司机", types: true, other: "注册城市规划师" },
      { count: "行政/人事/文职/后勤", types: true, other: "注册城市规划师" },
      { count: "客服总监/经理/主管/专员", types: true, other: "注册城市规划师" },
      { count: "技术支持经理/主管", types: true, other: "注册城市规划师" },
      { count: "产品技术支持/技术", types: true, other: "注册城市规划师" },
      { count: "售前/售后客服", types: true, other: "注册城市规划师" },

    ],
    company: "中住71",
    label: "50-150人/移动互联网/建筑/设计/教育",
    attestation: "http://www.liujiarong.top/WX/certified.png",
    types: "http://www.liujiarong.top/WX/popCompass.png",
    companyPerson: "http://www.liujiarong.top/WX/pending.png",
    history: "85664",
    counturl: "http://www.liujiarong.top/WX/Comup.png",
    city:"广州",
    pageShow:true,
    Fbutton:"取消",
    count:"",
    selectD:true ,
    gps:true,
    selected:true,
    selectType:'',
    changeJob:"兼职"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    wx.showLoading({
      title: 'loading...',
    });
    var that = this;
    wx.request({
      url: url,
      data: {
        page: page,
        page_size: page_size,
        sort: sort,
        is_easy: is_easy,
        lange_id: lange_id,
        pos_id: pos_id,
        unlearn: unlearn
      },
      success: function (res) {
        //console.info(that.data.list);  
        var list = that.data.list;
        for (var i = 0; i < res.data.list.length; i++) {
          list.push(res.data.list[i]);
        }
        that.setData({
          list: list
        });
        page++;
        wx.hideLoading();

      }
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.getStorage({
      key: 'gabbleCity',
      success: function (res) {
        console.log(res.data)
        that.setData({
          'used_list[0].name': res.data.select_city,

        })
        wx.removeStorage({
          key: 'gabbleCity',
          success: function (res) {
         
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
  ,
  jumpCity: function (event) {

    wx.navigateTo({
      url: "/pages/child/citySelect/citySelect"
    })
  },
  active: function (e) {
    this.setData({
      activeIndex: e.currentTarget.id
    })
    if(e.currentTarget.id==1){
      this.setData({
        selected: false
      })
    }else{
      wx.navigateTo({
        url: '/pages/child/citySelect/citySelect?other=usecity'//实际路径要写全
      })
      this.setData({
        activeIndex: -1
      })
    }
    
  
  },
  actives: function (e) {
    console.log(e.currentTarget.dataset.value)
    this.setData({
      activesIndex: e.currentTarget.id,
      selectType: e.currentTarget.dataset.value
    })

  },
  selectClick:function(){
    if(this.data.selectType==''){
      wx.showModal({
        title: '温馨提示',
        content: '您并没有选中任何类别',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }
    this.setData({
      selected:true,
      activeIndex:-1
    })
  },
  watchPassWord: function (event) {
    var that = this;
    var changdu =event.detail.value.length;
    if(changdu>0){
        that.setData({
        Fbutton: '完成',
         selectD: false,
         pageShow: true,
         gps: true
    })
    }else{
      that.setData({
        Fbutton: '取消',
        selectD: true ,
        gps: true
       
      })
    }
    // that.setData({
    //   city: res.data.select_city,
    // })
    console.log(event.detail.value);
    this.setData({
      count: event.detail.value
     

    })
  }, 
  urlTime:function(event){
    var that = this;
    var flage =that.data.Fbutton;
    if (flage=="完成"){
      that.setData({
        pageShow: false,
        gps:false,
        selectD:true
      })
    
    }else{
      wx.navigateBack({ changed: true });//返回上一页  
    }
  }, 
  remove:function(){
    this.setData({
      historys: []
    })
  }
  , gitval:function(event){
    console.log(event.currentTarget.dataset.val)
    this.setData({
       count: event.currentTarget.dataset.val,
       Fbutton: '完成',
       pageShow: false,
       gps: false,
       selectD:true
    
    })
  }, 
  open: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['兼职', '全职'],
      success: function (res) {
        if (!res.cancel) {
         
          if (res.tapIndex==0){
          that.setData({
            changeJob: "兼职"
            })
          }else{
            that.setData({
              changeJob: "全职"
            })
          }
        }
      }
    });
  }
  , clickMCity:function(){
    wx.navigateTo({
      url: "/pages/AboutCompany/AboutCompany"
    }) 
  }
})  