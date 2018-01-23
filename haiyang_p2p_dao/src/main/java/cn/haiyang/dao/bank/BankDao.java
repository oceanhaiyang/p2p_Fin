package cn.haiyang.dao.bank;

import cn.haiyang.domain.bankCardInfo.Bank;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BankDao extends JpaRepository<Bank,Integer> {
}
