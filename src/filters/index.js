export default {
    dateFilter(val){
      let date = new Date(val);
      let thisDate = new Date();
      if (thisDate.getFullYear() - date.getFullYear() >= 1) {
        return thisDate.getFullYear() - date.getFullYear() + ' 年前';
      }
      if (thisDate.getMonth() - date.getMonth() >= 1) {
        return thisDate.getMonth() - date.getMonth() + ' 月前';
      }
      if (thisDate.getDate() - date.getDate() > 0) {
        return thisDate.getDate() - date.getDate() + ' 天前';
      };

      if (thisDate.getHours() - date.getHours() < 0) {
        return thisDate.getHours() - date.getHours() + ' 小时前';
      };
      if (thisDate.getMinutes() - date.getMinutes() >= 10) {
        return thisDate.getMinutes() - date.getMinutes() + ' 分钟前';
      }else{
        return '刚刚';
      };

    },
    categoryFilter(val, categoryData){
      let name = '';
      categoryData.forEach(element => {
        if (parseInt(val) === parseInt(element.id)) {
          name = element.name;
        }
      });
      return name === '' ? val : name;
    }
}