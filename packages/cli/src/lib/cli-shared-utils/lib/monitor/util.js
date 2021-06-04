/* eslint-disable */
// @ts-ignore
'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
    function rejected(value) { try { step(generator['throw'](value)); } catch (e) { reject(e); } }
    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(exports, '__esModule', { value: true, });
exports.detectHash = exports.objToStr = void 0;
const urllib = require('urllib');
function objToStr(obj, spliter = '^', encode = false) {
  let strArr = [];
  let prop;
  if (obj instanceof Array) {
    strArr = obj;
  }
  else if (obj instanceof Object) {
    const handleValue = encode
      ? v => encodeURIComponent(v).replace(/'/g, '%27') // encode + replace 单引号
      : v => v;
    for (prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        const value = handleValue(obj[prop]);
        strArr.push(`${prop}=${value}`);
      }
    }
  }
  return strArr.join(spliter);
}
exports.objToStr = objToStr;
const hashMap = {};
function detectHash(hash) {
  return __awaiter(this, void 0, void 0, function* () {
    if (hashMap[hash]) {
      return Promise.resolve(true);
    }
    return urllib.request(`https://dataservice.alipayobjects.com/alertserver/hash/${hash}`).then(res => {
      if (res.status === 200 || res.status === 304) {
        hashMap[hash] = true;
        return true;
      }
      return false;
    });
  });
}
exports.detectHash = detectHash;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLGlDQUFpQztBQUVqQyxTQUFnQixRQUFRLENBQUMsR0FBRyxFQUFFLE9BQU8sR0FBRyxHQUFHLEVBQUUsTUFBTSxHQUFHLEtBQUs7SUFDekQsSUFBSSxNQUFNLEdBQVUsRUFBRSxDQUFDO0lBQ3ZCLElBQUksSUFBSSxDQUFDO0lBQ1QsSUFBSSxHQUFHLFlBQVksS0FBSyxFQUFFO1FBQ3hCLE1BQU0sR0FBRyxHQUFHLENBQUM7S0FDZDtTQUFNLElBQUksR0FBRyxZQUFZLE1BQU0sRUFBRTtRQUNoQyxNQUFNLFdBQVcsR0FBRyxNQUFNO1lBQ3hCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsdUJBQXVCO1lBQ3pFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNYLEtBQUssSUFBSSxJQUFJLEdBQUcsRUFBRTtZQUNoQixJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzVCLE1BQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxLQUFLLEVBQUUsQ0FBQyxDQUFDO2FBQ2pDO1NBQ0Y7S0FDRjtJQUNELE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM5QixDQUFDO0FBakJELDRCQWlCQztBQUVELE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUVuQixTQUFzQixVQUFVLENBQUMsSUFBWTs7UUFDM0MsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDakIsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzlCO1FBQ0QsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLDBEQUEwRCxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNqRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUM1QyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUNyQixPQUFPLElBQUksQ0FBQzthQUNiO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FBQTtBQVhELGdDQVdDIn0=