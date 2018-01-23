package cn.haiyang.service.bank;

import cn.haiyang.domain.bankCardInfo.Bank;

import java.util.List;

public interface BankService {
    List<Bank> findAll();
}
