import db from './db';
export class member extends db {
    constructor(id, name, joinTime, account, password, number, position, alevel, type, department) {
        super();
        this.id = id;
        this.name = name;
        this.joinTime = joinTime;
        this.account = account;
        this.password = password;
        this.number = number;
        this.position = position;
        this.alevel = alevel;
        this.type = type;
        this.department = department;
    }

    static mapping = {
        id: 'id',
        name: '姓名',
        joinTime: '加入时间',
        account: '学号/教工号',
        password: '密码',
        number: '联系方式',
        position: '职位',
        alevel: '账号等级',
        type: '身份',
        department: '所属部门'
    };

    static config = {
        id: {
            label: 'id',
            width: 120,
            isFixed: false,
            show: false
        },
        name: {
            label: '姓名',
            width: 120,
            isFixed: true,
            show: true
        },
        joinTime: {
            label: '加入时间',
            width: 120,
            isFixed: false,
            show: false
        },
        account: {
            label: '学号/教工号',
            width: 120,
            isFixed: false,
            show: true
        },
        password: {
            label: '密码',
            width: 120,
            isFixed: false,
            show: false
        },
        number: {
            label: '联系方式',
            width: 120,
            isFixed: false,
            show: true
        },
        position: {
            label: '职位',
            width: 120,
            isFixed: false,
            show: true
        },
        alevel: {
            label: '账号等级',
            width: 120,
            isfixed: false,
            show: false
        },
        type: {
            label: '身份',
            width: 120,
            isFixed: false,
            show: true
        },
        department: {
            label: '所属部门',
            width: 120,
            isFixed: false,
            show: true
        }
    }
}

export class finance extends db {
    constructor(id, applyName, use, amount, applicant, number, applicaTime, department) {
        super();
        this.id = id;
        this.applyName = applyName;
        this.amount = amount;
        this.use = use;
        this.applicant = applicant;
        this.number = number;
        this.applicaTime = applicaTime;
        this.department = department;
    }

    static mapping = {
        id: 'id',
        applyName: '条目名称',
        amount: '申请金额',
        use: '资金用途',
        applicant: '申请人',
        number: '联系方式',
        applicaTime: '申请时间',
        department: '所属部门'
    };

    static config = {
        id: {
            label: 'id',
            width: 120,
            isFixed: false,
            show: false
        },
        applyName: {
            label: '条目名称',
            width: 120,
            isFixed: true,
            show: true
        },
        amount: {
            label: '申请金额',
            width: 120,
            isFixed: false,
            show: true
        },
        use: {
            label: '资金用途',
            width: 120,
            isFixed: false,
            show: true
        },
        applicant: {
            label: '申请人',
            width: 120,
            isFixed: false,
            show: true
        },
        number: {
            label: '联系方式',
            width: 120,
            isFixed: false,
            show: true
        },
        applicaTime: {
            label: '申请时间',
            width: 120,
            isFixed: false,
            show: true
        },
        department: {
            label: '所属部门',
            width: 120,
            isFixed: false,
            show: true
        }
    }
}

export class goods extends db {
    constructor(id, name, buyTime, unitPrice, department) {
        super();
        this.id = id;
        this.name = name;
        this.buyTime = buyTime;
        this.unitPrice = unitPrice;
        this.department = department;
    }

    static mapping = {
        id: 'id',
        name: '名称',
        buyTime: '购买时间',
        unitPrice: '购买单价',
        department: '所属部门'
    };
    static config = {
        id: {
            label: 'id',
            width: 120,
            isFixed: false,
            show: false
        },
        name: {
            label: '名称',
            width: 120,
            isFixed: false,
            show: true
        },
        buyTime: {
            label: '购买时间',
            width: 120,
            isFixed: false,
            show: true
        },
        unitPrice: {
            label: '购买单价',
            width: 120,
            isFixed: false,
            show: true
        },
        department: {
            label: '所属部门',
            width: 120,
            isFixed: false,
            show: true
        }
    }
}

export class department extends db {
    constructor(id, createTime, name) {
        super();
        this.id = id;
        this.createTime = createTime;
        this.name = name;
    }

    static mapping = {
        id: 'id',
        createTime: '创建时间',
        name: '部门名称'
    }

    static config = {
        id: {
            label: 'id',
            width: 120,
            isFixed: false,
            show: false
        },
        createTime: {
            label: '创建时间',
            width: 120,
            isFixed: false,
            show: true
        },
        name: {
            label: '部门名称',
            width: 120,
            isFixed: false,
            show: true
        }
    }
}

export class document extends db {
    constructor(id, fileName, department, principal, ArchiveDate, remark) {
        super();
        this.id = id;
        this.fileName = fileName;
        this.principal = principal;
        this.department = department;
        this.ArchiveDate = ArchiveDate;
        this.remark = remark;
    }
    static mapping = {
        id: 'id',
        fileName: '文件名称',
        principal: '负责人',
        department: '所属部门',
        archiveDate: '存档日期',
        remark: '备注'
    };

    static config = {
        id: {
            label: 'id',
            width: 120,
            isFixed: false,
            show: false
        },
        fileName: {
            label: '文件名称',
            width: 120,
            isFixed: false,
            show: true
        },
        principal: {
            label: '负责人',
            width: 120,
            isFixed: false,
            show: true
        },
        department: {
            label: '所属部门',
            width: 120,
            isFixed: false,
            show: true
        },
        archiveDate: {
            label: '存档日期',
            width: 120,
            isFixed: false,
            show: true
        },
        remark: {
            label: '备注',
            width: 120,
            isFixed: false,
            show: true
        }
    }
}

export class record extends db {
    constructor(id, goodsName, lendTime, lender, leaderNumber, returnTime, returnNumber, returnee, department) {
        super();
        this.id = id;
        this.goodsName = goodsName;
        this.lendTime = lendTime;
        this.lender = lender;
        this.leaderNumber = leaderNumber;
        this.returnTime = returnTime;
        this.returnNumber = returnNumber;
        this.returnee = returnee;
        this.department = department;
    }
    static mapping = {
        id: 'id',
        goodsName: '物品名称',
        lendTime: '出借事件',
        lender: '出借人',
        leaderNumber: '出借人手机',
        returnTime: '归还时间',
        returnNumber: '归还人手机',
        returnee: '归还人',
        department: '所属部门'
    };
    static config = {
        id: {
            label: 'id',
            width: 120,
            isFixed: false,
            show: false
        },
        goodsName: {
            label: '物品名称',
            width: 120,
            isFixed: false,
            show: true
        },
        lendTime: {
            label: '出借时间',
            width: 120,
            isFixed: false,
            show: true
        },
        lender: {
            label: '出借人',
            width: 120,
            isFixed: false,
            show: true
        },
        lenderNumber: {
            label: '出借人手机',
            width: 120,
            isFixed: false,
            show: true
        },
        returnTime: {
            label: '归还时间',
            width: 120,
            isFixed: false,
            show: true
        },
        returnNumber: {
            label: '归还人手机',
            width: 120,
            isFixed: false,
            show: true
        },
        returnee: {
            label: '归还人',
            width: 120,
            isFixed: false,
            show: true
        },
        department: {
            label: '所属部门',
            width: 120,
            isFixed: false,
            show: true
        }
    }
}