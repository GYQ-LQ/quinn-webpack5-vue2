<template>
  <div
    class="container"
    ref="timeline"
    :style="{
      height: isNull ? 0 : BOX_WIDTH + 30 + 'px',
    }"
  >
    <div class="main-con">
      <div
        v-for="(item, index) in recordeList"
        @mousemove="mouseMove(index, item.length != 0)"
        @mouseleave="setTimer"
        :key="index"
        :class="[
          'round-item',
          item.length != 0 ? 'round-active' : '',
          index === curInd ? 'recorde-trigel' : '',
        ]"
      >
        <span class="round-title">{{
          (index + 1) % 2 === 0 ? '' : '第' + (index + 1) + '周'
        }}</span>
        <div
          :class="['recorde-con']"
          :style="{
            width: BOX_WIDTH + 'px',
            maxHeight: parseInt(BOX_WIDTH * 0.7) + 'px',
            transform:
              'translateX(' +
              (index <= LEFT_IND
                ? -30
                : index >= RIGHT_IND
                ? 0 - BOX_WIDTH + 40
                : 0 - BOX_WIDTH / 2 + 10) +
              'px)',
          }"
          v-show="index === curInd && item.length != 0"
        >
          <span class="recorde-name"
            >{{ BoxTitle }}（{{ item.length }}条）</span
          >
          <div class="recorde-main">
            <div class="recorde-item" v-for="(record, ind) in item" :key="ind">
              <span class="recorde-title">
                {{ ind + 1 }}
                {{ record.operateType == 1 ? '产品侵权：' : '' }}
                {{ record.operateType == 2 ? '操作失误：' : '' }}
                {{ record.operateType == 3 ? '产品断货：' : '' }}
              </span>
              <span class="recorde-remark">{{ record.remark }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimeLine',
  data() {
    return {
      timer: null,
      isNull: true,
      BoxTitle: '操作记录',
      BOX_WIDTH: 400,
      LEFT_IND: 8,
      RIGHT_IND: 17,
      curInd: 0,
      recordeList: [
        [
          {
            practiceid: 510,
            teamid: 9664,
            week: 2,
            type: 1,
            operateType: 1,
            remark:
              'Roll over image to zoom in Apple Lightning to 3.5 mm Headphone Jack Adapter',
            gmtCreated: {},
            gmtModified: {},
          },
          {
            practiceid: 510,
            teamid: 9664,
            week: 2,
            type: 1,
            operateType: 2,
            remark: '定价过低, 秒杀价格过低',
            gmtCreated: {},
            gmtModified: {},
          },
          {
            practiceid: 510,
            teamid: 9664,
            week: 2,
            type: 1,
            operateType: 3,
            remark:
              'Roll over image to zoom in Apple Lightning to 3.555 mm Jack',
            gmtCreated: {},
            gmtModified: {},
          },
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [
          {
            practiceid: 510,
            teamid: 9664,
            week: 2,
            type: 1,
            operateType: 1,
            remark:
              'Roll over image to zoom in Apple Lightning to 3.5 mm Headphone Jack Adapter',
            gmtCreated: {},
            gmtModified: {},
          },
        ],
        [],
        [],
        [],
        [],
        [
          {
            practiceid: 510,
            teamid: 9664,
            week: 2,
            type: 1,
            operateType: 1,
            remark:
              'Roll over image to zoom in Apple Lightning to 3.5 mm Headphone Jack Adapter',
            gmtCreated: {},
            gmtModified: {},
          },
          {
            practiceid: 510,
            teamid: 9664,
            week: 2,
            type: 1,
            operateType: 1,
            remark:
              'Roll over image to zoom in Apple Lightning to 3.5 mm Headphone Jack Adapter',
            gmtCreated: {},
            gmtModified: {},
          },
          {
            practiceid: 510,
            teamid: 9664,
            week: 2,
            type: 1,
            operateType: 2,
            remark: '定价过低, 秒杀价格过低',
            gmtCreated: {},
            gmtModified: {},
          },
          {
            practiceid: 510,
            teamid: 9664,
            week: 2,
            type: 1,
            operateType: 2,
            remark: '定价过低, 秒杀价格过低',
            gmtCreated: {},
            gmtModified: {},
          },
          {
            practiceid: 510,
            teamid: 9664,
            week: 2,
            type: 1,
            operateType: 2,
            remark: '定价过低, 秒杀价格过低',
            gmtCreated: {},
            gmtModified: {},
          },
          {
            practiceid: 510,
            teamid: 9664,
            week: 2,
            type: 1,
            operateType: 2,
            remark: '定价过低, 秒杀价格过低',
            gmtCreated: {},
            gmtModified: {},
          },
          {
            practiceid: 510,
            teamid: 9664,
            week: 2,
            type: 1,
            operateType: 3,
            remark:
              'Roll over image to zoom in Apple Lightning to 3.555 mm Jack',
            gmtCreated: {},
            gmtModified: {},
          },
          {
            practiceid: 510,
            teamid: 9664,
            week: 2,
            type: 1,
            operateType: 3,
            remark:
              'Roll over image to zoom in Apple Lightning to 3.555 mm Jack',
            gmtCreated: {},
            gmtModified: {},
          },
          {
            practiceid: 510,
            teamid: 9664,
            week: 2,
            type: 1,
            operateType: 3,
            remark:
              'Roll over image to zoom in Apple Lightning to 3.555 mm Jack',
            gmtCreated: {},
            gmtModified: {},
          },
          {
            practiceid: 510,
            teamid: 9664,
            week: 2,
            type: 1,
            operateType: 3,
            remark:
              'Roll over image to zoom in Apple Lightning to 3.555 mm Jack',
            gmtCreated: {},
            gmtModified: {},
          },
          {
            practiceid: 510,
            teamid: 9664,
            week: 2,
            type: 1,
            operateType: 3,
            remark:
              'Roll over image to zoom in Apple Lightning to 3.555 mm Jack',
            gmtCreated: {},
            gmtModified: {},
          },
          {
            practiceid: 510,
            teamid: 9664,
            week: 2,
            type: 1,
            operateType: 3,
            remark:
              'Roll over image to zoom in Apple Lightning to 3.555 mm Jack',
            gmtCreated: {},
            gmtModified: {},
          },
          {
            practiceid: 510,
            teamid: 9664,
            week: 2,
            type: 1,
            operateType: 3,
            remark:
              'Roll over image to zoom in Apple Lightning to 3.555 mm Jack',
            gmtCreated: {},
            gmtModified: {},
          },
        ],
        [],
        [],
        [],
        [],
        [],
        [
          {
            practiceid: 510,
            teamid: 9664,
            week: 2,
            type: 1,
            operateType: 2,
            remark: '定价过低, 秒杀价格过低',
            gmtCreated: {},
            gmtModified: {},
          },
          {
            practiceid: 510,
            teamid: 9664,
            week: 2,
            type: 1,
            operateType: 3,
            remark:
              'Roll over image to zoom in Apple Lightning to 3.555 mm Jack',
            gmtCreated: {},
            gmtModified: {},
          },
        ],
        [],
        [],
        [],
        [],
        [
          {
            practiceid: 510,
            teamid: 9664,
            week: 2,
            type: 1,
            operateType: 3,
            remark:
              'Roll over image to zoom in Apple Lightning to 3.555 mm Jack',
            gmtCreated: {},
            gmtModified: {},
          },
        ],
      ],
    };
  },
  computed: {},
  beforeDestroy() {
    this.removTimer;
  },
  mounted() {
    let that = this;
    that.initArgs();
    that.setWidth();
    window.onresize = function() {
      that.setWidth();
    };
  },
  methods: {
    setWidth() {
      let w = parseInt(this.$refs.timeline.offsetWidth * 0.33);
      this.BOX_WIDTH = w > 250 ? w : 250;
    },
    initArgs() {
      let len = this.recordeList.length;
      this.LEFT_IND = parseInt(len / 3) - 1;
      this.RIGHT_IND = parseInt((len / 3) * 2);
      this.isNull = true;
      for (let i = 0; i < len; i++) {
        const item = this.recordeList[i];
        if (item.length) {
          this.curInd = i;
          this.isNull = false;
          this.setTimer(i);
          return;
        }
      }
    },
    removTimer() {
      clearInterval(this.timer);
      this.timer = null;
    },
    setTimer() {
      this.removTimer();
      this.timer = setInterval(() => {
        let ind = this.curInd;
        while (++ind) {
          if (ind >= this.recordeList.length) ind = 0;
          if (this.recordeList[ind].length > 0) {
            this.curInd = ind;
            break;
          }
        }
      }, 3500);
    },
    mouseMove(ind, flag) {
      this.removTimer();
      if (flag) this.curInd = ind;
    },
  },
  components: {},
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 550px;
  padding: 50px 25px;
  box-sizing: border-box;
  margin-top: 30px;
  background: #fff;
  .main-con {
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
    &::before {
      display: inline-block;
      content: '';
      position: absolute;
      width: 100%;
      height: 0;
      border-bottom: 3px solid #e1e1e1;
    }
    .round-item {
      position: relative;
      display: inline-block;
      width: 12px;
      height: 12px;
      background: rgba(255, 255, 255, 1);
      border: 4px solid rgba(225, 225, 225, 1);
      border-radius: 50%;
      z-index: 3;
      .round-title {
        display: inline-block;
        position: absolute;
        font-style: normal;
        width: 50px;
        height: 14px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 14px;
        top: -25px;
        right: 50%;
        margin-right: -25px;
        text-align: center;
      }
    }
    .round-active {
      width: 20px;
      height: 20px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 6px 0px rgba(241, 143, 1, 0.49);
      border: 6px solid rgba(241, 143, 1, 1);
      cursor: pointer;
      &:hover {
        transition: all 0.2s linear;
        transform: scale(1.1);
      }
    }
  }
  .recorde-trigel {
    &::after {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      bottom: -32px;
      right: 50%;
      margin-right: -20px;
      border-bottom: 20px solid #fff5e8;
      border-left: 20px solid rgba(0, 0, 0, 0);
      border-right: 20px solid rgba(0, 0, 0, 0);
      border-top: 20px solid rgba(0, 0, 0, 0);
    }
  }
  .recorde-con {
    background: #fff5e8;
    border-radius: 8px;
    box-shadow: 0px 5px 10px 0px rgba(239, 239, 239, 1);
    margin-top: 40px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    // &::after {
    //   content: '';
    //   display: inline-block;
    //   position: absolute;
    //   height: 100px;
    //   width: 0;
    //   border-right: 1px solid black;
    //   left: 50%;
    //   top: -100px;
    // }
    .recorde-name {
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 18px;
      padding: 20px;
    }
    .recorde-main {
      width: 100%;
      box-sizing: border-box;
      flex: 1;
      background: white;
      text-align: left;
      padding: 0 17px 0 25px;
      border-top: 20px solid white;
      border-bottom: 20px solid white;
      border-right: 8px solid white;
      box-sizing: border-box;
      border-radius: 0 0 8px 8px;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 10px;
        height: 1px;
      }
      &::-webkit-scrollbar-track {
        border-radius: 10px;
        background: #fff;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #c8c8c8;
      }
      &::-webkit-scrollbar-thumb:hover {
        background: #888;
      }
      .recorde-item {
        display: flex;
        align-items: flex-start;
        padding: 20px 0;
        border-bottom: 1px solid #e1e1e1;
        .recorde-title {
          font-size: 16px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(102, 102, 102, 1);
          line-height: 18px;
        }
        .recorde-remark {
          flex: 1;
          font-size: 14px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(102, 102, 102, 1);
          line-height: 18px;
        }
      }
      .recorde-item:last-of-type {
        border-bottom: none;
      }
    }
  }
}
</style>
