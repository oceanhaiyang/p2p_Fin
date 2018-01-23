package cn.haiyang.service.bank;

import cn.haiyang.dao.bank.BankDao;
import cn.haiyang.domain.bankCardInfo.Bank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BankServiceImpl implements BankService {
    @Autowired
    private BankDao bankDao;

    @Override
    public List<Bank> findAll() {
        return bankDao.findAll();
    }
}
