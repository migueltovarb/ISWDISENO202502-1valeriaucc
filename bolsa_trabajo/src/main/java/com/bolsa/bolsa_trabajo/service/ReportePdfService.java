package com.bolsa.bolsa_trabajo.service;

import com.bolsa.bolsa_trabajo.dto.ReporteResponse;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;

import java.io.ByteArrayOutputStream;

public class ReportePdfService {
    private static byte[] generar(String titulo, ReporteResponse reporte) {
        try (PDDocument doc = new PDDocument(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            PDPage page = new PDPage();
            doc.addPage(page);
            PDPageContentStream content = new PDPageContentStream(doc, page);
            content.setFont(PDType1Font.HELVETICA_BOLD, 18);
            content.beginText();
            content.newLineAtOffset(50, 750);
            content.showText(titulo);
            content.endText();

            content.setFont(PDType1Font.HELVETICA, 12);
            float y = 720;
            y = escribir(content, "Fecha: " + reporte.getFechaGeneracion(), y);
            y = escribir(content, "Total Usuarios: " + safeInt(reporte.getTotalUsuarios()), y);
            y = escribir(content, "Total Ofertas Activas: " + safeInt(reporte.getTotalOfertasActivas()), y);
            y = escribir(content, "Total Postulaciones: " + safeInt(reporte.getTotalPostulaciones()), y);
            if (reporte.getDatosDetalle() != null) {
                for (var e : reporte.getDatosDetalle().entrySet()) {
                    y = escribir(content, e.getKey() + ": " + e.getValue(), y);
                }
            }
            content.close();
            doc.save(out);
            return out.toByteArray();
        } catch (Exception e) {
            return new byte[0];
        }
    }

    private static float escribir(PDPageContentStream content, String text, float y) throws Exception {
        content.beginText();
        content.newLineAtOffset(50, y);
        content.showText(text);
        content.endText();
        return y - 18;
    }

    private static int safeInt(Integer v) { return v == null ? 0 : v; }

    public static byte[] generarUsuariosPdf(ReporteResponse r) { return generar("Reporte de Usuarios", r); }
    public static byte[] generarOfertasPdf(ReporteResponse r) { return generar("Reporte de Ofertas", r); }
    public static byte[] generarPostulacionesPdf(ReporteResponse r) { return generar("Reporte de Postulaciones", r); }
    public static byte[] generarGeneralPdf(ReporteResponse r) { return generar("Reporte General", r); }
}

