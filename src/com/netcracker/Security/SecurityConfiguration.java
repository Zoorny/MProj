package com.netcracker.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	@Autowired
	CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler;

	@Autowired
	CustomLogoutSuccessHandler customLogoutSuccessHandler;

/*	@Autowired
	CustomAccessDeniedHandler customAccessDeniedHandler;*/

	@Autowired
	DataSource dataSource;

	@Autowired
	CustomAuthenticationFailureHandler customAuthenticationFailureHandler;

	@Bean
	public CustomBasicAuthenticationEntryPoint getBasicAuthEntryPoint(){
		return new CustomBasicAuthenticationEntryPoint();
	}

	@Autowired
	RestAuthenticationEntryPoint restAuthenticationEntryPoint;

	private static String REALM="REALM";
	
/*	@Autowired
	public void configureGlobalSecurity(AuthenticationManagerBuilder auth) throws Exception {
		auth.inMemoryAuthentication().withUser("bill").password("abc123").roles("ADMIN", "USER");
		auth.inMemoryAuthentication().withUser("tom").password("abc123").roles("USER");
	}*/

	@Autowired
	public void configAuthentication(AuthenticationManagerBuilder auth) throws Exception {
		auth.jdbcAuthentication().dataSource(dataSource)
				.usersByUsernameQuery("select USERNAME, PASSWORD, ENABLED from USERS where USERNAME=?")
				.authoritiesByUsernameQuery("select USERNAME, ROLE from USER_ROLES where USERNAME=?");
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable()
                .authorizeRequests()
                .antMatchers("/recommendations").hasRole("USER")
                .antMatchers("/profile/**").hasRole("USER")
                .antMatchers("/profile.html").hasRole("USER")
                .antMatchers("/admin.html").hasRole("ADMIN")
                .and().httpBasic().realmName(REALM).authenticationEntryPoint(restAuthenticationEntryPoint)
                .and().formLogin()
                .permitAll().successHandler(customAuthenticationSuccessHandler).failureHandler(customAuthenticationFailureHandler)
                .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and().logout().logoutSuccessHandler(customLogoutSuccessHandler);
				//.and().exceptionHandling().accessDeniedHandler(customAccessDeniedHandler);

 	}



 	//.failureUrl("/failure")
	//.loginPage("/login.html") .failureUrl("/login-failure.html") .usernameParameter("username").passwordParameter("password")
/*	@Bean
	public CustomBasicAuthenticationEntryPoint getBasicAuthEntryPoint(){
		return new CustomBasicAuthenticationEntryPoint();
	}*/

}
