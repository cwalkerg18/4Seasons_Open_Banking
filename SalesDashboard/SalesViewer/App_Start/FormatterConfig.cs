using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Globalization;
using System.Net.Http.Formatting;

namespace SalesViewer.App_Start {
    public class FormatterConfig {
        public static void RegisterFormatters(MediaTypeFormatterCollection formatters) {
            var json = new JsonMediaTypeFormatter();
            JsonSerializerSettings jSettings = new Newtonsoft.Json.JsonSerializerSettings() {
                Formatting = Formatting.Indented,
                DateTimeZoneHandling = DateTimeZoneHandling.Utc,
            };
            jSettings.Converters.Add(new CustomDateTimeConvertor());
            json.SerializerSettings = jSettings;
            formatters.Insert(0, json);
            // Remove XML formatter because Opera 12 replaces headers from */* to text/html
            formatters.Remove(formatters.XmlFormatter);
        }
    }

    public class CustomDateTimeConvertor : DateTimeConverterBase {
        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer) {
            return DateTime.Parse(reader.Value.ToString());
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer) {
            writer.WriteValue(((DateTime)value).ToString("yyyy/MM/dd HH:mm:ss", CultureInfo.InvariantCulture));
        }
    }
}