package com.lyceeSaintAlexandre.Backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.lyceeSaintAlexandre.Backend.repository.UserRepository;
import com.lyceeSaintAlexandre.Backend.model.User;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        final String authorizationHeader = request.getHeader("Authorization");

        String email = null;
        String jwt = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);  // Extract the JWT token
            email = jwtTokenUtil.extractUsername(jwt);  // Extract the username (email)
        }

        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            try {
                User user = userRepository.findByEmail(email).orElse(null);  // Find the user by email

                if (user != null && jwtTokenUtil.validateToken(jwt, email)) {  // Validate token
                    // Set up authentication with roles and authorities
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());

                    // Set the authentication context
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    logger.info("Authenticated user: {}", email);
                } else {
                    logger.warn("Invalid token for user: {}", email);
                }
            } catch (Exception e) {
                logger.error("Error during authentication", e);
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);  // Return 401 for failed authentication
                response.getWriter().write("Unauthorized: Invalid token");
                return;
            }
        }

        filterChain.doFilter(request, response);  // Proceed to the next filter in the chain
    }
}
