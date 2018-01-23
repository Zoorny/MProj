package com.netcracker;

import com.netcracker.Objects.Artist;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class Main {

    public static void main(String[] args) {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(SpringJDBCConfiguration.class);

        OracleDAO oracleDAO = context.getBean(OracleDAO.class);

/*        Artist artist = new Artist();
        artist.setId(3);
        artist.setName("Jon");
        artist.setDescription("The first and only one");*/

        System.out.println(oracleDAO.getAlbums());
        oracleDAO.getArtistById(1);

    }
}
