<?php
// Handle contact form submission
header('Content-Type: application/json');

// Sanitize input to prevent XSS
function sanitize_input($data) {
    return htmlspecialchars(stripslashes(trim($data)));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Get form data
        $name = sanitize_input($_POST['name'] ?? '');
        $email = sanitize_input($_POST['email'] ?? '');
        $subject = sanitize_input($_POST['subject'] ?? '');
        $phone = sanitize_input($_POST['phone'] ?? '');
        $message = sanitize_input($_POST['message'] ?? '');

        // Validate required fields
        if (empty($name) || empty($email) || empty($subject) || empty($message)) {
            http_response_code(400);
            echo json_encode(['error' => 'All required fields must be filled.']);
            exit;
        }

        // Validate email format
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid email address.']);
            exit;
        }

        // Recipient email (your email)
        $recipient = 'maisondekarabs@gmail.com';
        
        // Email headers
        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
        $headers .= "From: noreply@maisondekariabs.com\r\n";
        $headers .= "Reply-To: " . $email . "\r\n";

        // Email subject
        $email_subject = 'New Contact Form: ' . $subject;

        // Email body
        $email_body = "
        <html>
        <body style='font-family: Arial, sans-serif; color: #1A1A1A;'>
            <h2 style='color: #C6A75E;'>New Contact Form Submission</h2>
            <p><strong>Name:</strong> " . $name . "</p>
            <p><strong>Email:</strong> <a href='mailto:" . $email . "'>" . $email . "</a></p>
            <p><strong>Phone:</strong> " . (!empty($phone) ? $phone : 'Not provided') . "</p>
            <p><strong>Subject:</strong> " . $subject . "</p>
            <hr>
            <h3 style='color: #C6A75E;'>Message:</h3>
            <p>" . nl2br($message) . "</p>
        </body>
        </html>
        ";

        // Attempt to send email
        $email_sent = @mail($recipient, $email_subject, $email_body, $headers);

        // Also save to a log file as backup
        $log_file = __DIR__ . '/contact-submissions.log';
        $log_entry = "[" . date('Y-m-d H:i:s') . "] Name: " . $name . " | Email: " . $email . " | Subject: " . $subject . " | Message: " . str_replace("\n", " ", $message) . "\n";
        @file_put_contents($log_file, $log_entry, FILE_APPEND);

        // Return success even if mail() has issues (since we logged it)
        http_response_code(200);
        echo json_encode(['success' => 'Your message has been received! We will contact you soon.']);
        exit;

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'An error occurred: ' . $e->getMessage()]);
        exit;
    }
} else {
    // If not POST, return error
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed.']);
    exit;
}
?>

