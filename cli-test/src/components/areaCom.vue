<template>
    <!--居住地址三级联动选项-->
    <span>
        <!-- <span @click="choseAdd()"><input style="background: #fff;border: none;color:#333;width: 4.5rem;line-height: 0.3rem;font-size: 0.3rem;" placeholder="请选择省市县" disabled v-model="area"></span> -->
        <section class="showChose">
            <section class="address">
                <section class="title">
                    <h4>请选择时间</h4>
                    <!-- <span @click="closeAdd()">×</span> -->
                </section>
                <section class="title">
                    <div class="area" @click="provinceSelected()">{{Province?Province:info[province-1].name}}</div>
                    <div class="area" @click="citySelected()" :class="City?'':'active'">{{City?City:'请选择'}}</div>
                    <div class="area" @click="districtSelected()" :class="District?'':'active'" v-show="City">{{District?District:'请选择'}}</div>
                </section>
                <ul ref="selectUl">
                    <li class="addList" v-for="(v,k) in info" :key="k + 'v'"  @click="getProvinceId(v.id, v.name, k)" v-show="showProvince" :class="v.selected ? 'active' : ''">{{v.name}}</li>
                    <li class="addList" v-for="(v,k) in showCityList" :key="k + 'y'" @click="getCityId(v.id, v.name, k)" v-show="showCity" :class="v.selected ? 'active' : ''">{{v.name}}</li>
                    <li class="addList" v-for="(v,k) in showDistrictList" :key="k"  @click="getDistrictId(v.id, v.name, k)" v-show="showDistrict" :class="v.selected ? 'active' : ''">{{v.name}}</li>
                </ul>
            </section>
        </section>
    </span>
</template>

<script>
export default {
  name: 'areaCom',
  data() {
    return {
      area:'',
      showChose: false,
      showProvince: true,
      showCity: false,
      showDistrict: false,
      showCityList: false,
      showDistrictList: false,
      province: 1,
      city: 3,
      district: 57,
      GetProvinceId: 2,
      District: false,
      Province: false,
      City: false,
      // v-for循环判断是否为当前
      selected: false,
      info: [
        {
          id: 1, 
          name: '00', 
          city: [
            {
              id: 1,
              name: '00', 
              district: [
                  {
                    id: 1, name: '00'
                  },
                  {
                    id: 2, name: '01'
                  },
                  {
                    id: 3, name: '02'
                  },
                  {
                    id: 4, name: '03'
                  },
              ]
            },
            {
              id: 1,
              name: '01', 
              district: [
                  {
                    id: 1, name: '00'
                  },
                  {
                    id: 2, name: '01'
                  },
                  {
                    id: 3, name: '02'
                  },
                  {
                    id: 4, name: '03'
                  },
              ]
            }
          ]
        },
        {
          id: 1, 
          name: '01', 
          city: [
            {
              id: 1,
              name: '00', 
              district: [
                  {
                    id: 1, name: '00'
                  },
                  {
                    id: 2, name: '01'
                  },
                  {
                    id: 3, name: '02'
                  },
                  {
                    id: 4, name: '03'
                  },
              ]
            },
            {
              id: 1,
              name: '01', 
              district: [
                  {
                    id: 1, name: '00'
                  },
                  {
                    id: 2, name: '01'
                  },
                  {
                    id: 3, name: '02'
                  },
                  {
                    id: 4, name: '03'
                  },
              ]
            }
          ]
        },
      ]
    }
  },
  methods: {
    _filter(add,name,code) {
      let result = [];
      for(let i=0;i<add.length;i++) {
        if(code == add[i].id){
          result = add[i][name];
        }
      }
      return result;
    },
    getProvinceId: function(code,input,index) {
      this.province = code;
      this.Province = input;
      this.showProvince=false;
      this.showCity=true;
      this.showDistrict = false;
      this.showCityList = this._filter(this.info,'city',this.province);
      // 点击选择当前
      this.info.map( a => a.selected = false );
      this.info[index].selected = true;
      this.$refs.selectUl.scrollTop = 0;
    },
    provinceSelected: function() {
      // 清除市级和区级列表
      this.showCityList = false;
      this.showDistrictList = false;
      // 清除市级和区级选项
      this.City = false;
      this.District = false;
      // 选项页面的切换
      this.showProvince = true;
      this.showCity = false;
      this.showDistrict = false;
    },
    getCityId: function(code, input, index) {
      this.city = code;
      this.City = input;
      this.showProvince=false;
      this.showCity=false;
      this.showDistrict = true;
      this.showDistrictList = this._filter(this.showCityList,'district',this.city);
      // 选择当前添加active
      this.showCityList.map( a => a.selected = false );
      this.showCityList[index].selected = true;
      this.$refs.selectUl.scrollTop = 0;
    },
    citySelected: function() {
      this.showProvince=false;
      this.showCity=true;
      this.showDistrict = false;
    },
    getDistrictId: function(code, input, index) {
      this.district = code;
      this.District = input;
      // 选择当前添加active
      this.showDistrictList.map( a => a.selected = false );
      this.showDistrictList[index].selected = true;
      this.area = this.Province + this.City + this.District;
      // 选取市区选项之后关闭弹层
      this.showChose = false;
      this.sendValue(this.area);
      this.$refs.selectUl.scrollTop = 0;
    },
    districtSelected: function() {
      this.showProvince=false;
      this.showCity=false;
      this.showDistrict = true;
    },
    //给父组件传值
    sendValue(val) {
        this.$emit('getValue',val);
    }
  },
}
</script>
<style scoped>
.myAddress{
  width: 100%;
  background-color: white;
  border-top: 4px solid rgba(245,245,245,1);
  color:#333;
}
.myAddress .cont{
  border-bottom: 1px solid rgba(245,245,245,0.8);
}
.myAddress .cont span{
  display: inline-block;
  font-size: 0.28rem;
  color: #333;
  line-height: 0.88rem;
  margin-left: 0.32rem;
}
.myAddress .cont section{
  float:left;
}
.myAddress .cont p{
  display: inline-block;
  font-size: 0.28rem;
  color: #333333;
  line-height: 0.88rem;
  margin-left: 1rem;
}
.myAddress .cont .pic2{
  float: right;
  width: 0.14rem;
  height: 0.24rem;
  margin: 0.32rem 0.32rem 0.32rem 0;
}
.myAddress .cont p.text{
  margin-left: 0.72rem;
}
.showChose{
  width:100%;
  height:100%;
  position:fixed;
  top:0;
  left:0;
  z-index:120;
  background:rgba(0,0,0,0.5);
}
.address{
  position:absolute;
  bottom:0;
  left:0;
  z-index:121;
  background:#fff;
  width:100%;
}
.title h4{
  display:inline-block;
  margin-left:4rem;
  font-size:0.5rem;
  line-height:0.88rem;
  font-weight:normal;
  color:#999;
}
.title span{
  margin:0.42rem 0 0 2.2rem;
  font-size:0.45rem;
  line-height:0.34rem;
  color:#D8D8D8;
}
.area{
  display:inline-block;
  font-size:0.5rem;
  line-height:0.88rem;
  margin-left:0.42rem;
  color:#333;
}
.addList{
  width:100%;
  padding-left:0.32rem;
  font-size:0.4rem;
  line-height:0.88rem;
  color:#333;
}
/* 修改的格式 */
.address ul{
  width:95%;
  height:100%;
  height: 4.4rem;
  overflow:auto;
}
.address ul li{
  margin-left:5%;
}
.address .title .active{
  color: rgb(158, 0, 0);
  border-bottom:0.02rem solid  rgb(158, 0, 0);
}
.address ul .active{
  color: rgb(158, 0, 0);
}
</style>

