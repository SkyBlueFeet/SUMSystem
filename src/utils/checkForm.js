export function checkAge(rule, value, callback) {
    if (!value) {
        return callback(new Error('年龄不能为空'));
    }
    setTimeout(() => {
        const checkNum = /^[0-9]*$/;
        if (!checkNum.test(value)) {
            callback(new Error('请输入数字值'));
        } else {
            if (value < 18) {
                callback(new Error('必须年满18岁'));
            } else {
                callback();
            }
        }
    }, 1000);
};
export function checkName(rule, value, callback) {
    if (!value) {
        return callback(new Error('姓名不能为空'));
    }
    setTimeout(() => {
        const checkName = /^[\u4e00-\u9fa5]{2,4}$/i;
        if (!checkName.test(value)) {
            callback(new Error('请输入合法的中文姓名'));
        } else {
            callback();
        }
    }, 1000);
};
export function checkCardID(rule, value, callback) {
    var reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
    if (value === '') {
        callback(new Error('请输入身份证号'));
    } else if (reg.test(value) === false && value !== '') {
        callback(new Error('身份证输入不合法'));
    } else {
        callback();
    }
}
// export function validatePass(rule, value, callback, checkPass) {
//     if (value === '') {
//         callback(new Error('请输入密码'));
//     } else {
//         if (checkPass !== '') {
//             this.$refs.ruleForm2.validateField('checkPass');
//         }
//         callback();
//     }
// };
// export function validatePass2(rule, value, callback, pass) {
//     if (value === '') {
//         callback(new Error('请再次输入密码'));
//     } else if (value !== pass) {
//         callback(new Error('两次输入密码不一致!'));
//     } else {
//         callback();
//     }
// };