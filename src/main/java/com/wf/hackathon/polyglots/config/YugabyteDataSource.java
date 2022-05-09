package com.wf.hackathon.polyglots.config;

import com.yugabyte.ysql.YBClusterAwareDataSource;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;

@Configuration
@ComponentScan({"com.wf.hackathon.polyglots"})
public class YugabyteDataSource extends HikariConfig {

    @Primary
    @Bean(name = "ybdatasource")
    @ConfigurationProperties(prefix = "appdb.datasource")
    public DataSource ybDataSource() {
        HikariDataSource ds = (HikariDataSource) DataSourceBuilder.create().build();
        ds.setConnectionTestQuery("SELECT 1");
        return ds;
    }

}
