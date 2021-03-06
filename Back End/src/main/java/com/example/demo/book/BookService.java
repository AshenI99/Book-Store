package com.example.demo.book;

import org.dom4j.DocumentException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Properties;

@Service
public class BookService {

    private final BookRepository bookRepository;

    @Autowired
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> getBooks(){
        List<Book> books = bookRepository.findAll();
        for (int i = 0; i < books.size(); i++) {
            Book tempBook = books.get(i);
            if(tempBook.getInvoicePath() != null){
                tempBook.setInvoicePath(tempBook.getInvoicePath().toString().substring(10));
                books.set(i, tempBook);
            }
        }
        return books;

    }

    public void saveBook(Book book){
        bookRepository.save(book);
    }

    public void updateBook(Long id, String bookName, String author, double price, int quantity, String path){
        Book book = bookRepository.findById(id)
                .orElseThrow(()-> new IllegalStateException("Book with book id " +id+ " not exists!"));

        if(bookName != null && bookName.length() > 0 && !Objects.equals(book.getBookName(), bookName)){
            book.setBookName(bookName);
        }

        if(author != null && author.length() > 0 && !Objects.equals(book.getAuthor(), author)){
            book.setAuthor(author);
        }

        if(path != null && path.length() > 0 && !Objects.equals(book.getInvoicePath(), path)){
            book.setInvoicePath(path);
        }

        if(quantity !=0 &&!Objects.equals(book.getQuantity(), quantity)){
            book.setQuantity(quantity);
        }

        if(price !=0 && !Objects.equals(book.getPrice(), price)){
            book.setPrice(price);
        }

        bookRepository.save(book);
    }

    public void deleteBook(Long id){
        bookRepository.deleteById(id);
    }

    public Book getBook(Long id){
        Book book = bookRepository.findById(id).get();

        if(book.getInvoicePath() != null && !"".equals(book.getInvoicePath())){
            book.setInvoicePath(book.getInvoicePath().toString().substring(10));

        }

        return book;
    }

    public String uploadInvoice(MultipartFile file){
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        Path path = Paths.get("/upload", fileName).toAbsolutePath();
        System.out.println(path.toString());
        try {
            byte[] bytes = file.getBytes();
            Files.write(path, bytes);
        } catch (IOException ex) {

        }

        return path.toString();
    }

    public void deleteInvoice(String pathName){
        File file = new File(pathName);
        file.delete();
    }
}
