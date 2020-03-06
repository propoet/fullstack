package com.imooc.pay.enums;

public enum PayPlatformEnum {
//    支付平台:1-支付宝,2-微信
    ALPAY(1),
    WX(2),
    ;
    Integer code;

    PayPlatformEnum(Integer code) {
        this.code = code;
    }
}
